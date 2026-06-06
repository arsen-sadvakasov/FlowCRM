"use client";

import { useState } from "react";
import { Plus, MoreHorizontal, Search, Download, Phone, Mail, Building, Clock, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { createClient } from "./actions";

export default function ClientsClient({ clients }: { clients: any[] }) {
  const [open, setOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<any | null>(null);

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
                const res = await createClient(formData);
                if (res?.error) {
                  toast.error(res.error);
                } else {
                  toast.success("Клиент успешно добавлен!");
                  setOpen(false);
                }
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
              <TableRow 
                key={client.id} 
                className="hover:bg-gray-50/50 cursor-pointer"
                onClick={() => setSelectedClient(client)}
              >
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
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 text-gray-400 hover:text-gray-900"
                    onClick={(e) => e.stopPropagation()}
                  >
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

      <Sheet open={!!selectedClient} onOpenChange={(open) => !open && setSelectedClient(null)}>
        <SheetContent className="bg-white sm:max-w-md w-full overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Профиль клиента</SheetTitle>
          </SheetHeader>
          
          {selectedClient && (
            <div className="py-6 space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gray-100 border-4 border-white shadow-sm overflow-hidden flex-shrink-0">
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedClient.name}`} alt={selectedClient.name} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{selectedClient.name}</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                      selectedClient.status === 'ACTIVE' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {selectedClient.status === 'ACTIVE' ? 'Активный' : selectedClient.status}
                    </span>
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(selectedClient.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 space-y-4 border border-gray-100">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Контактная информация</h3>
                
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Телефон</p>
                    <p className="font-medium text-gray-900">{selectedClient.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="font-medium text-gray-900">{selectedClient.email || "—"}</p>
                  </div>
                </div>
                
                {selectedClient.company && (
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center shrink-0">
                      <Building className="w-4 h-4 text-gray-400" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Компания</p>
                      <p className="font-medium text-gray-900">{selectedClient.company}</p>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 flex items-center justify-between">
                  Сделки клиента
                  <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{selectedClient.deals?.length || 0}</span>
                </h3>
                
                <div className="space-y-3">
                  {selectedClient.deals?.length > 0 ? (
                    selectedClient.deals.map((deal: any) => (
                      <div key={deal.id} className="p-3 bg-white border border-gray-200 rounded-lg shadow-sm hover:border-purple-200 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium text-sm text-gray-900">{deal.title}</h4>
                          <span className="text-xs font-bold text-gray-900 bg-gray-50 px-2 py-1 rounded">
                            {deal.value} ₽
                          </span>
                        </div>
                        <div className="flex items-center justify-between mt-3">
                          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full capitalize">
                            {deal.stage}
                          </span>
                          <span className="text-[10px] text-gray-400">
                            {new Date(deal.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center p-6 border-2 border-dashed border-gray-100 rounded-xl">
                      <FileText className="w-6 h-6 text-gray-300 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">У клиента пока нет сделок.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
