"use client";

import { Plus, MoreHorizontal, Search, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";

const clients = [
  { id: "1", name: "ООО 'Альфа'", contact: "Иван Иванов", phone: "+7 (999) 123-45-67", email: "ivan@alfa.ru", status: "Активный", date: "12 Сен, 2024" },
  { id: "2", name: "ИП Смирнов", contact: "Алексей Смирнов", phone: "+7 (900) 555-33-22", email: "smirnov@mail.ru", status: "Новый", date: "15 Сен, 2024" },
  { id: "3", name: "ЗАО 'Вектор'", contact: "Мария Петрова", phone: "+7 (926) 777-88-99", email: "m.petrova@vector.ru", status: "Активный", date: "01 Авг, 2024" },
  { id: "4", name: "FinTech Group", contact: "Дмитрий Соколов", phone: "+7 (915) 111-22-33", email: "d.sokolov@fintech.com", status: "В архиве", date: "20 Июл, 2024" },
  { id: "5", name: "Студия Дизайна", contact: "Елена Волкова", phone: "+7 (999) 000-11-22", email: "elena@design.ru", status: "Активный", date: "10 Май, 2024" },
];

export default function ClientsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Клиенты</h1>
          <p className="text-sm text-gray-500 mt-1">
            Управление базой клиентов и контактными данными.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="h-9 rounded-lg">
            <Download className="w-4 h-4 mr-2" />
            Экспорт
          </Button>
          <Button className="bg-gray-900 text-white hover:bg-gray-800 rounded-lg h-9">
            <Plus className="w-4 h-4 mr-2" />
            Добавить клиента
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <div className="relative w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input 
              placeholder="Поиск клиентов..." 
              className="pl-9 h-9 border-gray-200"
            />
          </div>
          <Button variant="ghost" className="h-9 text-gray-500">Фильтры</Button>
        </div>
        
        <Table>
          <TableHeader className="bg-gray-50/50">
            <TableRow>
              <TableHead className="w-[250px]">Компания / Имя</TableHead>
              <TableHead>Контактное лицо</TableHead>
              <TableHead>Телефон</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Статус</TableHead>
              <TableHead className="text-right">Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clients.map((client) => (
              <TableRow key={client.id} className="hover:bg-gray-50/50">
                <TableCell className="font-medium text-gray-900">{client.name}</TableCell>
                <TableCell className="text-gray-600">{client.contact}</TableCell>
                <TableCell className="text-gray-600">{client.phone}</TableCell>
                <TableCell className="text-gray-500">{client.email}</TableCell>
                <TableCell>
                  <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${
                    client.status === 'Активный' ? 'bg-green-50 text-green-700' :
                    client.status === 'Новый' ? 'bg-blue-50 text-blue-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {client.status}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-gray-900">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        <div className="p-4 border-t border-gray-100 text-sm text-gray-500 flex items-center justify-between">
          <span>Показано 1-5 из 24 клиентов</span>
          <div className="flex gap-1">
            <Button variant="outline" size="sm" disabled>Назад</Button>
            <Button variant="outline" size="sm">Вперед</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
