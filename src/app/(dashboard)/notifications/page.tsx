import { Bell } from "lucide-react";

export default function NotificationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Уведомления</h1>
        <p className="text-sm text-gray-500 mt-1">Входящие оповещения и история активности.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center flex flex-col items-center justify-center">
        <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-4">
          <Bell className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Нет новых уведомлений</h2>
        <p className="text-gray-500 max-w-md">В данный момент центр уведомлений пуст. Здесь вы будете получать обновления по задачам и сделкам.</p>
      </div>
    </div>
  );
}
