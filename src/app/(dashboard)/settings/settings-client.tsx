"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateProfile, updatePassword } from "./actions";

export function SettingsClient({ user }: { user: any }) {
  const [profileLoading, setProfileLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [profileMessage, setProfileMessage] = useState({ type: "", text: "" });
  const [passwordMessage, setPasswordMessage] = useState({ type: "", text: "" });

  async function handleProfileSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setProfileLoading(true);
    setProfileMessage({ type: "", text: "" });
    const formData = new FormData(e.currentTarget);
    try {
      const res = await updateProfile(formData);
      if (res.error) setProfileMessage({ type: "error", text: res.error });
      else setProfileMessage({ type: "success", text: "Профиль успешно обновлен! (Обновите страницу для изменений)" });
    } catch {
      setProfileMessage({ type: "error", text: "Произошла ошибка" });
    } finally {
      setProfileLoading(false);
    }
  }

  async function handlePasswordSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPasswordLoading(true);
    setPasswordMessage({ type: "", text: "" });
    const formData = new FormData(e.currentTarget);
    try {
      const res = await updatePassword(formData);
      if (res.error) setPasswordMessage({ type: "error", text: res.error });
      else {
        setPasswordMessage({ type: "success", text: "Пароль успешно изменен!" });
        (e.target as HTMLFormElement).reset();
      }
    } catch {
      setPasswordMessage({ type: "error", text: "Произошла ошибка" });
    } finally {
      setPasswordLoading(false);
    }
  }

  if (!user) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Profile Form */}
      <div className="bg-card p-8 rounded-2xl shadow-sm border border-border transition-colors">
        <h2 className="text-xl font-bold text-foreground mb-6">Личные данные</h2>
        <div className="space-y-6">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-muted border-2 border-background shadow-sm shrink-0">
              <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name}`} alt={user?.name || ""} />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Аватар</p>
              <p className="text-xs text-muted-foreground">Генерируется автоматически на основе имени</p>
            </div>
          </div>
          
          <form onSubmit={handleProfileSubmit} className="space-y-4 max-w-md">
            <div>
              <Label className="text-foreground">Имя профиля</Label>
              <Input 
                name="name" 
                defaultValue={user?.name || ""} 
                required
                className="mt-1 bg-background text-foreground border-input"
              />
            </div>
            <div>
              <Label className="text-foreground">Email</Label>
              <Input 
                name="email" 
                defaultValue={user?.email || ""} 
                disabled
                className="mt-1 bg-muted text-muted-foreground border-input opacity-70"
              />
              <p className="text-xs text-muted-foreground mt-1">Email нельзя изменить</p>
            </div>
            <div>
              <Label className="text-foreground">Роль</Label>
              <Input defaultValue={user.role} disabled className="mt-1 bg-muted text-muted-foreground border-input opacity-70" />
            </div>
            
            <div className="pt-2">
              <Button type="submit" disabled={profileLoading} className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90">
                {profileLoading ? "Сохранение..." : "Сохранить изменения"}
              </Button>
            </div>
          </form>
        </div>
      </div>

      <div className="bg-card p-8 rounded-2xl shadow-sm border border-border transition-colors">
        <h2 className="text-xl font-bold text-foreground mb-6">Безопасность</h2>
        
        <form onSubmit={handlePasswordSubmit} className="space-y-4 max-w-md">
          <div>
            <Label className="text-foreground">Текущий пароль</Label>
            <Input name="currentPassword" type="password" required className="mt-1 bg-background text-foreground border-input" />
          </div>
          <div>
            <Label className="text-foreground">Новый пароль</Label>
            <Input name="newPassword" type="password" required minLength={6} className="mt-1 bg-background text-foreground border-input" />
          </div>
          <div>
            <Label className="text-foreground">Подтвердите новый пароль</Label>
            <Input name="confirmPassword" type="password" required minLength={6} className="mt-1 bg-background text-foreground border-input" />
          </div>

          <div className="pt-2">
            <Button type="submit" disabled={passwordLoading} className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90">
              {passwordLoading ? "Обновление..." : "Обновить пароль"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
