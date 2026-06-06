"use client";

import { Search, Plus } from "lucide-react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

const routeNames: Record<string, string> = {
  "/": "Дашборд",
  "/clients": "Клиенты",
  "/deals": "Сделки",
  "/tasks": "Задачи",
  "/team": "Команда",
  "/analytics": "Аналитика",
  "/settings": "Настройки",
  "/notifications": "Уведомления",
};

export function Header() {
  const pathname = usePathname();
  const pageName = routeNames[pathname] || "Обзор";

  return (
    <header className="h-16 border-b bg-white flex items-center justify-between px-6 shrink-0">
      <div className="flex items-center gap-4">
        <h2 className="text-xl font-semibold text-gray-900">{pageName}</h2>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Поиск..." 
            className="pl-9 pr-4 py-1.5 bg-gray-100 border-transparent rounded-lg text-sm focus:bg-white focus:border-gray-300 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all w-64"
          />
        </div>
        <Button className="bg-gray-900 text-white hover:bg-gray-800 rounded-lg h-9">
          <Plus className="w-4 h-4 mr-2" />
          Создать задачу
        </Button>
      </div>
    </header>
  );
}
