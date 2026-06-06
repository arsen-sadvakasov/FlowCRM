import { auth } from "@/lib/auth";
import { SettingsClient } from "./settings-client";

export default async function SettingsPage() {
  const session = await auth();
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Настройки</h1>
          <p className="text-sm text-muted-foreground mt-1">Управление профилем и безопасностью.</p>
        </div>
      </div>

      <SettingsClient user={session?.user} />
    </div>
  );
}
