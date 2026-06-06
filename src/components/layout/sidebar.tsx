"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Users, 
  KanbanSquare, 
  CheckSquare, 
  UsersRound, 
  BarChart3, 
  Settings,
  Bell,
  LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";

const OVERVIEW_LINKS = [
  { name: "Дашборд", href: "/", icon: LayoutDashboard },
  { name: "Клиенты", href: "/clients", icon: Users },
  { name: "Сделки", href: "/deals", icon: KanbanSquare },
  { name: "Задачи", href: "/tasks", icon: CheckSquare },
];

const TOOLS_LINKS = [
  { name: "Уведомления", href: "/notifications", icon: Bell, badge: 7 },
  { name: "Команда", href: "/team", icon: UsersRound },
];

const METRICS_LINKS = [
  { name: "Аналитика", href: "/analytics", icon: BarChart3 },
];

import { logout } from "@/app/login/actions";

export function Sidebar({ user }: { user?: any }) {
  const pathname = usePathname();

  return (
    <aside className="w-64 flex flex-col h-screen border-r bg-[#f8fafc] overflow-y-auto hidden md:flex shrink-0">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 rounded-xl overflow-hidden flex items-center justify-center shadow-sm bg-white shrink-0">
          <img src="/logo.png" alt="FlowCRM Logo" className="w-full h-full object-contain" />
        </div>
        <div>
          <h1 className="font-bold text-gray-900 leading-tight">FlowCRM</h1>
          <p className="text-xs text-gray-500">Workspace</p>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-6 pb-6">
        <div>
          <p className="px-3 text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">Обзор</p>
          <div className="space-y-1">
            {OVERVIEW_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  pathname === link.href 
                    ? "bg-white text-gray-900 shadow-sm border border-gray-100" 
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                )}
              >
                <link.icon className="w-4 h-4" />
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="px-3 text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">Инструменты</p>
          <div className="space-y-1">
            {TOOLS_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  pathname === link.href 
                    ? "bg-white text-gray-900 shadow-sm border border-gray-100" 
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                )}
              >
                <div className="flex items-center gap-3">
                  <link.icon className="w-4 h-4" />
                  {link.name}
                </div>
                {link.badge && (
                  <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                    {link.badge}
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="px-3 text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">Метрики</p>
          <div className="space-y-1">
            {METRICS_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  pathname === link.href 
                    ? "bg-white text-gray-900 shadow-sm border border-gray-100" 
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                )}
              >
                <link.icon className="w-4 h-4" />
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      <div className="p-4 border-t mt-auto space-y-1 bg-[#f8fafc]">
        <Link
          href="/settings"
          className={cn(
            "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
            pathname === "/settings" 
              ? "bg-white text-gray-900 shadow-sm border border-gray-100" 
              : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
          )}
        >
          <Settings className="w-4 h-4" />
          Настройки
        </Link>
        <button
          onClick={() => logout()}
          className="flex w-full items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Выйти
        </button>
        
        {user && (
          <div className="mt-4 flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden shrink-0">
               <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} alt="User" className="w-full h-full object-cover" />
            </div>
            <div className="truncate flex-1">
              <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
              <p className="text-xs text-gray-500 truncate">
                {user.role === 'ADMIN' ? 'Администратор' : 
                 user.role === 'MANAGER' ? 'Руководитель' : 
                 user.role === 'SALES' ? 'Менеджер по продажам' : 'Сотрудник'}
              </p>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
