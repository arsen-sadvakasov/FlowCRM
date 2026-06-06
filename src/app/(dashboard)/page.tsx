import { Users, FolderKanban, CheckCircle2, TrendingUp, Calendar, ArrowUpRight } from "lucide-react";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function Dashboard() {
  const clientsCount = await prisma.client.count();
  const dealsCount = await prisma.deal.count();
  const tasksCount = await prisma.task.count();
  
  const stats = [
    {
      title: "Всего клиентов",
      value: clientsCount.toString(),
      trend: "+12%",
      trendUp: true,
      icon: Users,
      color: "bg-blue-500",
      lightColor: "bg-blue-50",
    },
    {
      title: "Активные сделки",
      value: dealsCount.toString(),
      trend: "+5%",
      trendUp: true,
      icon: FolderKanban,
      color: "bg-purple-500",
      lightColor: "bg-purple-50",
    },
    {
      title: "Задачи",
      value: tasksCount.toString(),
      trend: "-2%",
      trendUp: false,
      icon: CheckCircle2,
      color: "bg-orange-500",
      lightColor: "bg-orange-50",
    },
    {
      title: "Выручка (План)",
      value: "1.2M ₽",
      trend: "+18%",
      trendUp: true,
      icon: TrendingUp,
      color: "bg-green-500",
      lightColor: "bg-green-50",
    },
  ];

  const recentTasks = await prisma.task.findMany({
    take: 4,
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="space-y-8">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Добро пожаловать обратно 👋</h1>
          <p className="text-sm text-gray-500 mt-1">
            Вот что происходит в вашем бизнесе сегодня.
          </p>
        </div>
        <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-lg border border-gray-100 shadow-sm">
          <Calendar className="w-4 h-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">
            {new Date().toLocaleDateString('ru-RU', { month: 'long', day: 'numeric', year: 'numeric' })}
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl ${stat.lightColor}`}>
                <stat.icon className={`w-6 h-6 text-${stat.color.replace('bg-', '')}`} />
              </div>
              <div className={`flex items-center gap-1 text-sm font-medium px-2 py-1 rounded-md ${
                stat.trendUp ? 'text-green-700 bg-green-50' : 'text-red-700 bg-red-50'
              }`}>
                {stat.trendUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowUpRight className="w-3 h-3 rotate-90" />}
                {stat.trend}
              </div>
            </div>
            <div>
              <h3 className="text-gray-500 text-sm font-medium mb-1">{stat.title}</h3>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            </div>
            {/* Decorative background gradient */}
            <div className={`absolute -bottom-6 -right-6 w-24 h-24 rounded-full blur-2xl opacity-0 group-hover:opacity-20 transition-opacity ${stat.color}`} />
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart Area (Placeholder) */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900">Аналитика продаж</h2>
            <select className="bg-gray-50 border-none text-sm font-medium text-gray-600 rounded-lg focus:ring-0">
              <option>Эта неделя</option>
              <option>Этот месяц</option>
              <option>Этот год</option>
            </select>
          </div>
          <div className="h-[300px] flex items-center justify-center border-2 border-dashed border-gray-100 rounded-xl bg-gray-50/50">
            <p className="text-gray-400 text-sm font-medium">График будет доступен после подключения библиотеки Recharts</p>
          </div>
        </div>

        {/* Tasks Area */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900">Задачи на сегодня</h2>
            <button className="text-sm font-medium text-purple-600 hover:text-purple-700">Все</button>
          </div>
          <div className="space-y-4">
            {recentTasks.map((task) => (
              <div key={task.id} className="flex gap-4 p-3 hover:bg-gray-50 rounded-xl transition-colors group cursor-pointer border border-transparent hover:border-gray-100">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                  task.status === 'COMPLETED' ? 'bg-green-100 text-green-600' : 'bg-purple-100 text-purple-600'
                }`}>
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className={`text-sm font-semibold text-gray-900 mb-0.5 ${task.status === 'COMPLETED' ? 'line-through text-gray-400' : ''}`}>
                    {task.title}
                  </h4>
                  <p className="text-xs text-gray-500 font-medium">{new Date(task.createdAt).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}</p>
                </div>
              </div>
            ))}
            {recentTasks.length === 0 && (
              <p className="text-sm text-gray-500 text-center py-4">Нет новых задач.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
