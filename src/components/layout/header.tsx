"use client";

import { useState } from "react";
import { Search, Plus } from "lucide-react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CommandMenu } from "@/components/command-menu";

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
  const [commandOpen, setCommandOpen] = useState(false);

  return (
    <>
      <header className="h-16 border-b bg-white flex items-center justify-between px-6 shrink-0">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-semibold text-gray-900">{pageName}</h2>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => setCommandOpen(true)}
            className="relative flex items-center w-64 bg-gray-100 hover:bg-gray-200 border-transparent rounded-lg py-1.5 px-3 text-sm text-gray-500 transition-colors"
          >
            <Search className="w-4 h-4 mr-2 shrink-0 text-gray-400" />
            <span className="flex-1 text-left">Поиск...</span>
            <kbd className="hidden sm:inline-flex h-5 items-center gap-1 rounded border border-gray-300 bg-white px-1.5 font-mono text-[10px] font-medium text-gray-500 opacity-100">
              <span className="text-xs">⌘</span>K
            </kbd>
          </button>
          <Button className="bg-gray-900 text-white hover:bg-gray-800 rounded-lg h-9">
            <Plus className="w-4 h-4 mr-2" />
            Создать задачу
          </Button>
        </div>
      </header>
      
      <CommandMenu open={commandOpen} setOpen={setCommandOpen} />
    </>
  );
}
