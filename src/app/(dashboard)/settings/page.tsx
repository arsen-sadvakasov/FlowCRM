import { Settings as SettingsIcon } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Настройки</h1>
        <p className="text-sm text-gray-500 mt-1">Управление профилем и конфигурацией CRM.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center flex flex-col items-center justify-center">
        <div className="w-16 h-16 bg-gray-100 text-gray-600 rounded-2xl flex items-center justify-center mb-4">
          <SettingsIcon className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Настройки профиля</h2>
        <p className="text-gray-500 max-w-md">Этот раздел находится в процессе разработки. В будущем здесь можно будет менять пароль, настраивать интеграции и персонализировать интерфейс.</p>
      </div>
    </div>
  );
}
