import { PrismaClient } from "@prisma/client";
import { Mail, Phone, MoreHorizontal, Shield, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const prisma = new PrismaClient();

export default async function TeamPage() {
  const users = await prisma.user.findMany({
    orderBy: { role: "asc" }
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Команда</h1>
          <p className="text-sm text-gray-500 mt-1">
            Управление сотрудниками и правами доступа.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="h-9 rounded-lg">Роли</Button>
          <Button className="bg-gray-900 text-white hover:bg-gray-800 rounded-lg h-9">
            <Plus className="w-4 h-4 mr-2" />
            Добавить сотрудника
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((member) => (
          <div key={member.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow group relative overflow-hidden">
            <div className="absolute top-4 right-4">
              <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-gray-900">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full border-4 border-gray-50 bg-gray-100 overflow-hidden mb-4">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${member.name}`} alt={member.name} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">{member.name}</h3>
              <p className="text-sm text-gray-500 mb-3">{member.role === 'ADMIN' ? 'Администратор' : 'Сотрудник'}</p>
              
              <div className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold mb-6 ${
                member.role === 'ADMIN' ? 'bg-purple-50 text-purple-700' : 'bg-blue-50 text-blue-700'
              }`}>
                {member.role === 'ADMIN' && <Shield className="w-3 h-3 mr-1" />}
                {member.role === 'ADMIN' ? 'Полный доступ' : 'Ограниченный'}
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-gray-50">
              <div className="flex items-center text-sm text-gray-600">
                <Mail className="w-4 h-4 mr-3 text-gray-400" />
                {member.email}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
