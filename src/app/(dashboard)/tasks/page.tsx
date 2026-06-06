"use client";

import { Plus, MoreHorizontal, Search, CheckCircle2, Circle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const tasks = [
  { id: "1", title: "Подготовить квартальный отчет", project: "Внутреннее", assignee: "Иван И.", status: "В работе", priority: "Высокий", date: "Сегодня" },
  { id: "2", title: "Созвон с клиентом ООО 'Альфа'", project: "Продажи", assignee: "Иван И.", status: "К выполнению", priority: "Средний", date: "Завтра" },
  { id: "3", title: "Обновить дизайн презентации", project: "Маркетинг", assignee: "Анна С.", status: "На проверке", priority: "Средний", date: "12 Окт" },
  { id: "4", title: "Составить договор", project: "Документы", assignee: "Алексей В.", status: "Готово", priority: "Высокий", date: "10 Окт" },
];

export default function TasksPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Задачи</h1>
          <p className="text-sm text-gray-500 mt-1">
            Список задач вашей команды и отслеживание статуса.
          </p>
        </div>
        <Button className="bg-gray-900 text-white hover:bg-gray-800 rounded-lg h-9">
          <Plus className="w-4 h-4 mr-2" />
          Новая задача
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between gap-4">
          <div className="relative w-full max-w-sm">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input 
              placeholder="Поиск задач..." 
              className="pl-9 h-9 border-gray-200"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="h-9">Все</Button>
            <Button variant="ghost" className="h-9 text-gray-500">Мои задачи</Button>
          </div>
        </div>
        
        <div className="divide-y divide-gray-100">
          {tasks.map((task) => (
            <div key={task.id} className="p-4 flex items-center justify-between hover:bg-gray-50/50 transition-colors group">
              <div className="flex items-center gap-4">
                <button className="text-gray-300 hover:text-purple-600 transition-colors">
                  {task.status === "Готово" ? (
                    <CheckCircle2 className="w-6 h-6 text-green-500" />
                  ) : (
                    <Circle className="w-6 h-6" />
                  )}
                </button>
                <div>
                  <h3 className={`font-medium text-sm ${task.status === "Готово" ? "text-gray-500 line-through" : "text-gray-900"}`}>
                    {task.title}
                  </h3>
                  <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                    <span className="font-medium text-purple-600 bg-purple-50 px-2 py-0.5 rounded-md">
                      {task.project}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {task.date}
                    </span>
                    <span>• {task.assignee}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className={`text-[10px] font-bold px-2 py-1 rounded-md ${
                  task.priority === 'Высокий' ? 'bg-red-50 text-red-700' :
                  'bg-orange-50 text-orange-700'
                }`}>
                  {task.priority}
                </span>
                <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 h-8 w-8 text-gray-400">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
