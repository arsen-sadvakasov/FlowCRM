import { Bell } from "lucide-react";

export default function NotificationsPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Уведомления</h1>
        <p className="text-sm text-muted-foreground mt-1">Входящие оповещения и история активности.</p>
      </div>

      <div className="bg-card rounded-2xl shadow-sm border border-border p-12 text-center flex flex-col items-center justify-center transition-colors">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
          <Bell className="w-8 h-8 text-muted-foreground" />
        </div>
        <h2 className="text-xl font-bold text-foreground mb-2">Нет новых уведомлений</h2>
        <p className="text-muted-foreground max-w-md">В данный момент центр уведомлений пуст. Здесь вы будете получать обновления по задачам и сделкам.</p>
      </div>
    </div>
  );
}
