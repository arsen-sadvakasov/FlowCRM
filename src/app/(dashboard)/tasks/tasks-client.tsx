"use client";

import { useState } from "react";
import { CheckCircle2, Circle, MoreHorizontal, Calendar, Plus, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { toggleTaskStatus, createTask } from "./actions";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function TasksClient({ initialTasks, users }: { initialTasks: any[], users: any[] }) {
  const [tasks, setTasks] = useState(initialTasks);
  const [open, setOpen] = useState(false);

  const handleToggle = async (taskId: string, currentStatus: string) => {
    const isCompleted = currentStatus !== "COMPLETED";
    // Optimistic update
    setTasks(tasks.map(t => t.id === taskId ? { ...t, status: isCompleted ? "COMPLETED" : "TODO" } : t));
    await toggleTaskStatus(taskId, isCompleted);
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Задачи</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Ваш список дел на сегодня и ближайшие дни.
          </p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg h-9">
              <Plus className="w-4 h-4 mr-2" />
              Добавить задачу
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Новая задача</DialogTitle>
            </DialogHeader>
            <form action={async (formData) => {
              const res = await createTask(formData);
              if (res?.error) {
                toast.error(res.error);
              } else {
                toast.success("Задача добавлена!");
                setOpen(false);
              }
            }} className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Название</Label>
                <Input name="title" required placeholder="Например: Позвонить клиенту" />
              </div>
              <div className="space-y-2">
                <Label>Назначить сотруднику</Label>
                <select name="assignedToId" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                  <option value="">Себе</option>
                  {users.map(u => (
                    <option key={u.id} value={u.id}>{u.name}</option>
                  ))}
                </select>
              </div>
              <Button type="submit" className="w-full">Сохранить</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-card rounded-xl shadow-sm border border-border p-2 transition-colors">
        <div className="space-y-1">
          {tasks.map((task) => {
            const isCompleted = task.status === "COMPLETED";
            return (
              <div 
                key={task.id} 
                className={cn(
                  "flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 group transition-colors",
                  isCompleted && "opacity-60"
                )}
              >
                <div className="flex items-start gap-3">
                  <button onClick={() => handleToggle(task.id, task.status)} className="mt-0.5">
                    {isCompleted ? (
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    ) : (
                      <Circle className="w-5 h-5 text-muted-foreground/30 group-hover:text-primary transition-colors" />
                    )}
                  </button>
                  <div>
                    <h3 className={cn(
                      "text-sm font-medium mb-1 transition-colors",
                      isCompleted ? "line-through text-muted-foreground" : "text-foreground"
                    )}>
                      {task.title}
                    </h3>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(task.createdAt).toLocaleDateString()}
                      </span>
                      {task.assignedTo && (
                        <span className="flex items-center gap-1">
                          <User className="w-3.5 h-3.5" />
                          {task.assignedTo.name}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            );
          })}
          {tasks.length === 0 && (
            <div className="text-center p-8 text-muted-foreground text-sm">
              Нет задач. Самое время создать новую!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
