"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { authenticate } from "./actions";

export default function LoginPage() {
  const [errorMessage, dispatch, isPending] = useActionState(
    authenticate,
    undefined
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-6 shrink-0 overflow-hidden">
            <img src="/logo.png" alt="FlowCRM Logo" className="w-full h-full object-contain p-2" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Добро пожаловать</h1>
          <p className="text-sm text-gray-500">
            Войдите в свой аккаунт FlowCRM для продолжения
          </p>
        </div>

        <form action={dispatch} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Электронная почта</Label>
            <Input 
              id="email" 
              name="email"
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
              name="password"
              type="password" 
              required 
              className="bg-gray-50"
            />
          </div>

          {errorMessage && (
            <p className="text-sm text-red-500 bg-red-50 p-2 rounded-md">{errorMessage}</p>
          )}

          <Button 
            type="submit" 
            className="w-full bg-gray-900 text-white hover:bg-gray-800 h-11"
            disabled={isPending}
          >
            {isPending ? (
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
