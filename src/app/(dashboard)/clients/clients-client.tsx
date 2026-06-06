"use client";

import { useState } from "react";
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
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createClient } from "./actions";

export default function ClientsClient({ clients }: { clients: any[] }) {
  const [open, setOpen] = useState(false);

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
          
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gray-900 text-white hover:bg-gray-800 rounded-lg h-9">
                <Plus className="w-4 h-4 mr-2" />
                Добавить клиента
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Новый клиент</DialogTitle>
              </DialogHeader>
              <form action={async (formData) => {
                await createClient(formData);
                setOpen(false);
              }} className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Имя / Контактное лицо *</Label>
                  <Input id="name" name="name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Телефон *</Label>
                  <Input id="phone" name="phone" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Компания</Label>
                  <Input id="company" name="company" />
                </div>
                <Button type="submit" className="w-full">Сохранить</Button>
              </form>
            </DialogContent>
          </Dialog>

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
              <TableHead>Имя / Компания</TableHead>
              <TableHead>Телефон</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Статус</TableHead>
              <TableHead className="text-right">Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clients.map((client) => (
              <TableRow key={client.id} className="hover:bg-gray-50/50">
                <TableCell className="font-medium text-gray-900">
                  {client.name}
                  {client.company && <span className="text-gray-500 text-xs block">{client.company}</span>}
                </TableCell>
                <TableCell className="text-gray-600">{client.phone}</TableCell>
                <TableCell className="text-gray-500">{client.email || "—"}</TableCell>
                <TableCell>
                  <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${
                    client.status === 'ACTIVE' ? 'bg-green-50 text-green-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {client.status === 'ACTIVE' ? 'Активный' : client.status}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-gray-900">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {clients.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-gray-500 py-8">
                  Нет добавленных клиентов
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
