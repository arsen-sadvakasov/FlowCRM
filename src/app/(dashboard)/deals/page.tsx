"use client";

import { useState } from "react";
import { MoreHorizontal, Paperclip, MessageSquare, Clock, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const initialColumns = [
  { id: "NEW", title: "Новая заявка", count: 24, color: "bg-gray-200" },
  { id: "CONTACTED", title: "Контакт установлен", count: 4, color: "bg-blue-200" },
  { id: "NEGOTIATION", title: "Переговоры", count: 7, color: "bg-purple-200" },
  { id: "PROPOSAL", title: "Предложение", count: 2, color: "bg-orange-200" },
  { id: "WON", title: "Завершено", count: 13, color: "bg-green-200" },
];

const initialCards = [
  { id: "1", columnId: "NEW", title: "Разработка сайта", client: "ООО 'Альфа'", date: "29 Июл, 24", priority: "Срочно", priorityColor: "text-red-600 bg-red-50", comments: 13 },
  { id: "2", columnId: "NEW", title: "Настройка рекламы", client: "ИП Смирнов", date: "2 Июн, 24", priority: "Средний", priorityColor: "text-orange-600 bg-orange-50", comments: 0 },
  { id: "3", columnId: "CONTACTED", title: "Презентация продукта", client: "ЗАО 'Вектор'", date: "19 Сен, 24", priority: "Низкий", priorityColor: "text-green-600 bg-green-50", comments: 7 },
  { id: "4", columnId: "NEGOTIATION", title: "Обсуждение договора", client: "FinTech", date: "21 Сен, 24", priority: "Срочно", priorityColor: "text-red-600 bg-red-50", comments: 1 },
  { id: "5", columnId: "WON", title: "Создание логотипа", client: "Студия Дизайна", date: "13 Июл, 24", priority: "Низкий", priorityColor: "text-green-600 bg-green-50", comments: 13 },
];

export default function DealsPage() {
  const [columns] = useState(initialColumns);
  const [cards] = useState(initialCards);

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Воронка продаж</h1>
          <p className="text-sm text-gray-500 mt-1">
            Управляйте сделками и перемещайте их по этапами воронки.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="h-9 rounded-lg">Фильтр</Button>
          <Button className="bg-gray-900 text-white hover:bg-gray-800 rounded-lg h-9">
            <Plus className="w-4 h-4 mr-2" />
            Добавить сделку
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-x-auto overflow-y-hidden">
        <div className="flex gap-6 h-full min-w-max pb-4 items-start">
          {columns.map((col) => (
            <div key={col.id} className="w-[320px] shrink-0 flex flex-col h-full">
              <div className="flex items-center justify-between mb-4 px-1">
                <div className="flex items-center gap-2">
                  <div className={cn("w-2.5 h-2.5 rounded-full", col.color)} />
                  <h3 className="font-semibold text-gray-900 text-sm">{col.title}</h3>
                  <span className="text-xs text-gray-500 font-medium ml-1">{col.count}</span>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-3 pb-2 pr-1">
                {cards
                  .filter((card) => card.columnId === col.id)
                  .map((card) => (
                    <div 
                      key={card.id} 
                      className="bg-white p-4 rounded-xl shadow-sm border border-gray-100/50 hover:shadow-md transition-shadow cursor-grab active:cursor-grabbing"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-medium text-gray-500 flex items-center gap-1">
                          <Paperclip className="w-3 h-3" />
                          CRM-{card.id}
                        </span>
                        <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-md", card.priorityColor)}>
                          {card.priority}
                        </span>
                      </div>
                      
                      <h4 className="font-semibold text-gray-900 text-sm mb-1">{card.title}</h4>
                      <p className="text-xs text-gray-500 mb-4">{card.client}</p>
                      
                      <div className="flex items-center text-xs text-gray-500 font-medium bg-gray-50 w-max px-2 py-1 rounded-md mb-4">
                        <Clock className="w-3 h-3 mr-1" />
                        До: {card.date}
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                        <div className="flex -space-x-2">
                          <div className="w-6 h-6 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                             <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alice" alt="avatar" />
                          </div>
                          <div className="w-6 h-6 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                             <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Bob" alt="avatar" />
                          </div>
                        </div>
                        {card.comments > 0 && (
                          <div className="flex items-center gap-1 text-gray-500 text-xs">
                            <MessageSquare className="w-3.5 h-3.5" />
                            {card.comments}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  {/* Empty state zone or drop zone */}
                  <div className="h-20 rounded-xl border-2 border-dashed border-gray-200/60 bg-transparent" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
