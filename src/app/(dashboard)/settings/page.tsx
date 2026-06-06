import { auth } from "@/lib/auth";
import { SettingsClient } from "./settings-client";

export default async function SettingsPage() {
  const session = await auth();
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Настройки</h1>
        <p className="text-sm text-gray-500 mt-1">Управление профилем и безопасностью.</p>
      </div>

      <SettingsClient user={session?.user} />
    </div>
  );
}
