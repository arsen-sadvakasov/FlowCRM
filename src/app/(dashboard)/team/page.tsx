"use client";

import { Plus, MoreHorizontal, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const teamMembers = [
  { id: "1", name: "Иван Иванов", role: "Руководитель", email: "ivan@flowcrm.ru", phone: "+7 (999) 111-22-33", status: "Онлайн", avatar: "Felix" },
  { id: "2", name: "Анна Смирнова", role: "Менеджер", email: "anna@flowcrm.ru", phone: "+7 (900) 222-33-44", status: "Онлайн", avatar: "Aneka" },
  { id: "3", name: "Алексей Волков", role: "Сотрудник", email: "alexey@flowcrm.ru", phone: "+7 (926) 333-44-55", status: "Офлайн", avatar: "Jack" },
  { id: "4", name: "Мария Петрова", role: "Администратор", email: "maria@flowcrm.ru", phone: "+7 (915) 444-55-66", status: "В отпуске", avatar: "Jocelyn" },
];

export default function TeamPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Команда</h1>
          <p className="text-sm text-gray-500 mt-1">
            Управление сотрудниками, ролями и правами доступа.
          </p>
        </div>
        <Button className="bg-gray-900 text-white hover:bg-gray-800 rounded-lg h-9">
          <Plus className="w-4 h-4 mr-2" />
          Пригласить
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {teamMembers.map((member) => (
          <div key={member.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-100 overflow-hidden relative border-2 border-white shadow-sm">
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${member.avatar}`} alt={member.name} className="w-full h-full object-cover" />
                  <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                    member.status === 'Онлайн' ? 'bg-green-500' :
                    member.status === 'Офлайн' ? 'bg-gray-300' :
                    'bg-orange-400'
                  }`} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{member.name}</h3>
                  <p className="text-xs text-gray-500">{member.role}</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-gray-900 -mt-2 -mr-2">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="space-y-2 mt-4 pt-4 border-t border-gray-50">
              <div className="flex items-center text-sm text-gray-600">
                <Mail className="w-4 h-4 mr-2 text-gray-400" />
                {member.email}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Phone className="w-4 h-4 mr-2 text-gray-400" />
                {member.phone}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
