"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Имитация авторизации
    setTimeout(() => {
      router.push("/");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-2xl shadow-sm mx-auto mb-4">
            F
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Добро пожаловать</h1>
          <p className="text-sm text-gray-500">
            Войдите в свой аккаунт FlowCRM для продолжения
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Электронная почта</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="name@flowcrm.ru" 
              required 
              className="bg-gray-50"
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Пароль</Label>
              <a href="#" className="text-xs font-medium text-purple-600 hover:text-purple-500">
                Забыли пароль?
              </a>
            </div>
            <Input 
              id="password" 
              type="password" 
              required 
              className="bg-gray-50"
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gray-900 text-white hover:bg-gray-800 h-11"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            Войти
          </Button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Нет аккаунта?{" "}
          <a href="#" className="font-medium text-purple-600 hover:text-purple-500">
            Обратитесь к администратору
          </a>
        </p>
      </div>
    </div>
  );
}
