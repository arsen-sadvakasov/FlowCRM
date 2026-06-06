import { Calendar, CheckCircle2 } from "lucide-react";
import { PrismaClient } from "@prisma/client";
import { StatsGrid } from "./stats-grid";
import { SalesChart } from "./sales-chart";

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
      iconName: "Users",
      color: "bg-blue-500",
      lightColor: "bg-blue-50",
      textColor: "text-blue-500",
      href: "/clients"
    },
    {
      title: "Активные сделки",
      value: dealsCount.toString(),
      trend: "+5%",
      trendUp: true,
      iconName: "FolderKanban",
      color: "bg-purple-500",
      lightColor: "bg-purple-50",
      textColor: "text-purple-500",
      href: "/deals"
    },
    {
      title: "Задачи",
      value: tasksCount.toString(),
      trend: "-2%",
      trendUp: false,
      iconName: "CheckCircle2",
      color: "bg-orange-500",
      lightColor: "bg-orange-50",
      textColor: "text-orange-500",
      href: "/tasks"
    },
    {
      title: "Выручка (План)",
      value: "1.2M ₽",
      trend: "+18%",
      trendUp: true,
      iconName: "TrendingUp",
      color: "bg-green-500",
      lightColor: "bg-green-50",
      textColor: "text-green-500",
      href: "/analytics"
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
          <h1 className="text-2xl font-bold text-foreground">Добро пожаловать обратно 👋</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Вот что происходит в вашем бизнесе сегодня.
          </p>
        </div>
        <div className="flex items-center gap-3 bg-card px-4 py-2 rounded-lg border border-border shadow-sm">
          <Calendar className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">
            {new Date().toLocaleDateString('ru-RU', { month: 'long', day: 'numeric', year: 'numeric' })}
          </span>
        </div>
      </div>

      {/* Animated Stats Grid */}
      <StatsGrid stats={stats} />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart Area */}
        <div className="lg:col-span-2 bg-card p-6 rounded-2xl border border-border shadow-sm transition-colors">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-foreground">Аналитика продаж</h2>
            <select className="bg-muted border-none text-sm font-medium text-muted-foreground rounded-lg focus:ring-0">
              <option>Этот год</option>
              <option>Прошлый год</option>
            </select>
          </div>
          <SalesChart data={[
            { name: "Янв", value: 120000 },
            { name: "Фев", value: 180000 },
            { name: "Мар", value: 250000 },
            { name: "Апр", value: 210000 },
            { name: "Май", value: 380000 },
            { name: "Июн", value: 450000 },
          ]} />
        </div>

        {/* Tasks Area */}
        <div className="bg-card p-6 rounded-2xl border border-border shadow-sm transition-colors">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-foreground">Задачи на сегодня</h2>
            <button className="text-sm font-medium text-primary hover:text-primary/80">Все</button>
          </div>
          <div className="space-y-4">
            {recentTasks.map((task) => (
              <div key={task.id} className="flex gap-4 p-3 hover:bg-muted/50 rounded-xl transition-colors group cursor-pointer border border-transparent hover:border-border">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                  task.status === 'COMPLETED' ? 'bg-green-500/10 text-green-600 dark:text-green-400' : 'bg-primary/10 text-primary'
                }`}>
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className={`text-sm font-semibold mb-0.5 ${task.status === 'COMPLETED' ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                    {task.title}
                  </h4>
                  <p className="text-xs text-muted-foreground font-medium">{new Date(task.createdAt).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}</p>
                </div>
              </div>
            ))}
            {recentTasks.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-4">Нет новых задач.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
