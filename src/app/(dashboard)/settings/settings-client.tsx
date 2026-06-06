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
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Личные данные</h2>
        <form onSubmit={handleProfileSubmit} className="space-y-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 border-2 border-white shadow-sm shrink-0">
              <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} alt={user.name} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Аватар</p>
              <p className="text-xs text-gray-500">Генерируется автоматически на основе имени</p>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="name">Имя</Label>
            <Input id="name" name="name" defaultValue={user.name} required />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" defaultValue={user.email} required />
          </div>

          <div className="space-y-2">
            <Label>Текущая Роль</Label>
            <Input defaultValue={user.role} disabled className="bg-gray-50 text-gray-500" />
          </div>

          {profileMessage.text && (
            <p className={`text-sm font-medium ${profileMessage.type === "error" ? "text-red-500" : "text-green-600"}`}>
              {profileMessage.text}
            </p>
          )}

          <Button type="submit" disabled={profileLoading} className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white">
            {profileLoading ? "Сохранение..." : "Сохранить изменения"}
          </Button>
        </form>
      </div>

      {/* Password Form */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Безопасность</h2>
        <form onSubmit={handlePasswordSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Текущий пароль</Label>
            <Input id="currentPassword" name="currentPassword" type="password" required />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="newPassword">Новый пароль</Label>
            <Input id="newPassword" name="newPassword" type="password" required minLength={6} />
          </div>

          {passwordMessage.text && (
            <p className={`text-sm font-medium ${passwordMessage.type === "error" ? "text-red-500" : "text-green-600"}`}>
              {passwordMessage.text}
            </p>
          )}

          <Button type="submit" disabled={passwordLoading} className="w-full sm:w-auto bg-gray-900 hover:bg-gray-800 text-white">
            {passwordLoading ? "Обновление..." : "Сменить пароль"}
          </Button>
        </form>
      </div>
    </div>
  );
}
