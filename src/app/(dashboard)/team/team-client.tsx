"use client";

import { useState } from "react";
import { Mail, MoreHorizontal, Shield, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { createEmployee } from "./actions";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

const ROLE_NAMES: Record<string, string> = {
  ADMIN: "Администратор",
  MANAGER: "Руководитель",
  SALES: "Менеджер по продажам",
  EMPLOYEE: "Сотрудник"
};

export function TeamClient({ initialUsers }: { initialUsers: User[] }) {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    const formData = new FormData(e.currentTarget);
    try {
      await createEmployee(formData);
      toast.success("Сотрудник успешно добавлен!");
      setIsModalOpen(false);
      window.location.reload(); 
    } catch (err: any) {
      toast.error(err.message || "Произошла ошибка");
      setError(err.message || "Произошла ошибка");
      setIsLoading(false);
    }
  }

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
          <Button 
            onClick={() => setIsModalOpen(true)}
            className="bg-gray-900 text-white hover:bg-gray-800 rounded-lg h-9"
          >
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
              <p className="text-sm text-gray-500 mb-3">{ROLE_NAMES[member.role] || member.role}</p>
              
              <div className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold mb-6 ${
                member.role === 'ADMIN' ? 'bg-purple-50 text-purple-700' : 
                member.role === 'MANAGER' ? 'bg-blue-50 text-blue-700' :
                member.role === 'SALES' ? 'bg-green-50 text-green-700' :
                'bg-gray-100 text-gray-700'
              }`}>
                {(member.role === 'ADMIN' || member.role === 'MANAGER') && <Shield className="w-3 h-3 mr-1" />}
                {member.role === 'ADMIN' ? 'Полный доступ' : 
                 member.role === 'MANAGER' ? 'Управление' : 'Ограниченный'}
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

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">Новый сотрудник</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-900">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {error && <p className="text-red-500 text-sm">{error}</p>}
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Имя</label>
                <input 
                  name="name" 
                  type="text" 
                  required 
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500" 
                  placeholder="Иван Иванов" 
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input 
                  name="email" 
                  type="email" 
                  required 
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500" 
                  placeholder="ivan@flowcrm.ru" 
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Пароль</label>
                <input 
                  name="password" 
                  type="password" 
                  required 
                  minLength={6}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500" 
                  placeholder="••••••••" 
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Роль</label>
                <select 
                  name="role" 
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                >
                  <option value="EMPLOYEE">Сотрудник</option>
                  <option value="SALES">Менеджер по продажам</option>
                  <option value="MANAGER">Руководитель</option>
                  <option value="ADMIN">Администратор</option>
                </select>
              </div>
              
              <div className="pt-4 flex justify-end gap-3">
                <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>
                  Отмена
                </Button>
                <Button type="submit" disabled={isLoading} className="bg-purple-600 text-white hover:bg-purple-700">
                  {isLoading ? "Сохранение..." : "Добавить"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
