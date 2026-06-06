"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Users, 
  Briefcase, 
  TrendingUp, 
  CheckCircle2 
} from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Обзор показателей</h1>
        <p className="text-sm text-gray-500 mt-1">
          Анализируйте ваши ключевые метрики и задачи на сегодня.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="shadow-sm border-gray-100">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Количество клиентов</CardTitle>
            <Users className="w-4 h-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">1,248</div>
            <p className="text-xs text-green-500 mt-1 flex items-center">
              <TrendingUp className="w-3 h-3 mr-1" />
              +12% за месяц
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-gray-100">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Активные сделки</CardTitle>
            <Briefcase className="w-4 h-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">42</div>
            <p className="text-xs text-gray-500 mt-1">На сумму 4.2M ₽</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-gray-100">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Общий доход</CardTitle>
            <TrendingUp className="w-4 h-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">12.5M ₽</div>
            <p className="text-xs text-green-500 mt-1 flex items-center">
              <TrendingUp className="w-3 h-3 mr-1" />
              +8.1% (30 дн)
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-gray-100">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Задачи на сегодня</CardTitle>
            <CheckCircle2 className="w-4 h-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">8</div>
            <p className="text-xs text-orange-500 mt-1">
              3 срочные задачи
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* Placeholder for Main Chart */}
        <Card className="lg:col-span-2 shadow-sm border-gray-100">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Динамика продаж</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center border-t border-gray-50 bg-gray-50/50 rounded-b-xl">
            <p className="text-sm text-gray-400">График будет добавлен позже (Recharts)</p>
          </CardContent>
        </Card>

        {/* Placeholder for Tasks/Activity */}
        <Card className="shadow-sm border-gray-100">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Ближайшие дедлайны</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-4 border-t border-gray-50">
             <div className="flex justify-between items-start">
               <div>
                 <p className="text-sm font-medium text-gray-900">Подготовка договора</p>
                 <p className="text-xs text-gray-500">ООО "Альфа"</p>
               </div>
               <span className="text-[10px] font-bold px-2 py-1 bg-red-100 text-red-700 rounded-md">Срочно</span>
             </div>
             <div className="flex justify-between items-start">
               <div>
                 <p className="text-sm font-medium text-gray-900">Звонок клиенту</p>
                 <p className="text-xs text-gray-500">ИП Смирнов</p>
               </div>
               <span className="text-[10px] font-bold px-2 py-1 bg-orange-100 text-orange-700 rounded-md">Сегодня</span>
             </div>
             <div className="flex justify-between items-start">
               <div>
                 <p className="text-sm font-medium text-gray-900">Отправить презентацию</p>
                 <p className="text-xs text-gray-500">ЗАО "ТехПром"</p>
               </div>
               <span className="text-[10px] font-bold px-2 py-1 bg-green-100 text-green-700 rounded-md">Завтра</span>
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
