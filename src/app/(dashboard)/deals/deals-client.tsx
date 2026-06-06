"use client";

import { useState } from "react";
import { MoreHorizontal, Paperclip, MessageSquare, Clock, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { updateDealStage, createDeal } from "./actions";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const COLUMNS = [
  { id: "NEW", title: "Новая заявка", color: "bg-gray-200" },
  { id: "CONTACTED", title: "Контакт установлен", color: "bg-blue-200" },
  { id: "NEGOTIATION", title: "Переговоры", color: "bg-purple-200" },
  { id: "PROPOSAL", title: "Предложение", color: "bg-orange-200" },
  { id: "WON", title: "Завершено", color: "bg-green-200" },
];

export default function DealsClient({ initialDeals, clients }: { initialDeals: any[], clients: any[] }) {
  const [deals, setDeals] = useState(initialDeals);
  const [open, setOpen] = useState(false);

  const handleDragStart = (e: React.DragEvent, dealId: string) => {
    e.dataTransfer.setData("dealId", dealId);
  };

  const handleDrop = async (e: React.DragEvent, columnId: string) => {
    e.preventDefault();
    const dealId = e.dataTransfer.getData("dealId");
    if (!dealId) return;

    // Optimistic update
    setDeals(deals.map(d => d.id === dealId ? { ...d, stage: columnId } : d));
    
    // Server update
    const res = await updateDealStage(dealId, columnId);
    if (res?.error) {
      toast.error(res.error);
    } else {
      toast.success("Статус изменен");
    }
  };

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
          
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gray-900 text-white hover:bg-gray-800 rounded-lg h-9">
                <Plus className="w-4 h-4 mr-2" />
                Добавить сделку
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Новая сделка</DialogTitle>
              </DialogHeader>
              <form action={async (formData) => {
                const res = await createDeal(formData);
                if (res?.error) {
                  toast.error(res.error);
                } else {
                  toast.success("Сделка создана!");
                  setOpen(false);
                }
              }} className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Название сделки</Label>
                  <Input name="title" required placeholder="Например: Внедрение CRM" />
                </div>
                <div className="space-y-2">
                  <Label>Клиент</Label>
                  <select name="clientId" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" required>
                    <option value="">Выберите клиента</option>
                    {clients.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>Сумма</Label>
                  <Input name="value" type="number" defaultValue={0} />
                </div>
                <Button type="submit" className="w-full">Создать</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex-1 overflow-x-auto overflow-y-hidden">
        <div className="flex gap-6 h-full min-w-max pb-4 items-start">
          {COLUMNS.map((col) => {
            const columnDeals = deals.filter(d => d.stage === col.id);
            return (
              <div 
                key={col.id} 
                className="w-[320px] shrink-0 flex flex-col h-full bg-gray-50/50 rounded-xl p-2"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => handleDrop(e, col.id)}
              >
                <div className="flex items-center justify-between mb-4 px-2 pt-2">
                  <div className="flex items-center gap-2">
                    <div className={cn("w-2.5 h-2.5 rounded-full", col.color)} />
                    <h3 className="font-semibold text-gray-900 text-sm">{col.title}</h3>
                    <span className="text-xs text-gray-500 font-medium ml-1">{columnDeals.length}</span>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto space-y-3 pb-2">
                  {columnDeals.map((deal) => (
                    <div 
                      key={deal.id} 
                      draggable
                      onDragStart={(e) => handleDragStart(e, deal.id)}
                      className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all cursor-grab active:cursor-grabbing"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-medium text-gray-500 flex items-center gap-1">
                          <Paperclip className="w-3 h-3" />
                          {deal.value} ₽
                        </span>
                      </div>
                      
                      <h4 className="font-semibold text-gray-900 text-sm mb-1">{deal.title}</h4>
                      <p className="text-xs text-gray-500 mb-4">{deal.client?.name}</p>
                      
                      <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                        <div className="w-6 h-6 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                           <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alice" alt="avatar" />
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {/* Empty drop zone placeholder */}
                  {columnDeals.length === 0 && (
                    <div className="h-24 rounded-xl border-2 border-dashed border-gray-200/60 flex items-center justify-center text-xs text-gray-400">
                      Перетащите сюда
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
