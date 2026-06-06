"use client";

import { useState } from "react";
import { Search, Plus } from "lucide-react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CommandMenu } from "@/components/command-menu";
import { ModeToggle } from "@/components/mode-toggle";

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
      <header className="h-16 border-b border-border bg-background flex items-center justify-between px-6 shrink-0 transition-colors">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-semibold text-foreground">{pageName}</h2>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => setCommandOpen(true)}
            className="relative flex items-center w-64 bg-muted hover:bg-muted/80 border-transparent rounded-lg py-1.5 px-3 text-sm text-muted-foreground transition-colors"
          >
            <Search className="w-4 h-4 mr-2 shrink-0 text-muted-foreground" />
            <span className="flex-1 text-left">Поиск...</span>
            <kbd className="hidden sm:inline-flex h-5 items-center gap-1 rounded border border-border bg-background px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
              <span className="text-xs">⌘</span>K
            </kbd>
          </button>
          
          <ModeToggle />

          <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg h-9">
            <Plus className="w-4 h-4 mr-2" />
            Создать задачу
          </Button>
        </div>
      </header>
      
      <CommandMenu open={commandOpen} setOpen={setCommandOpen} />
    </>
  );
}
