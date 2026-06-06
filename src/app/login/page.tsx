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
    <div className="min-h-screen bg-background flex items-center justify-center p-4 transition-colors">
      <div className="max-w-md w-full bg-card rounded-2xl shadow-xl border border-border p-8 transition-colors">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-card rounded-2xl shadow-sm border border-border flex items-center justify-center mx-auto mb-6 shrink-0 overflow-hidden">
            <img src="/logo.png" alt="FlowCRM Logo" className="w-full h-full object-contain p-2" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Добро пожаловать</h1>
          <p className="text-sm text-muted-foreground">
            Войдите в свой аккаунт FlowCRM для продолжения
          </p>
        </div>

        <form action={dispatch} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-foreground">Электронная почта</Label>
            <Input 
              id="email" 
              name="email"
              type="email" 
              placeholder="name@flowcrm.ru" 
              required 
              className="bg-background text-foreground border-input"
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-foreground">Пароль</Label>
              <a href="#" className="text-xs font-medium text-primary hover:text-primary/80 transition-colors">
                Забыли пароль?
              </a>
            </div>
            <Input 
              id="password" 
              name="password"
              type="password" 
              required 
              className="bg-background text-foreground border-input"
            />
          </div>

          {errorMessage && (
            <p className="text-sm text-destructive bg-destructive/10 p-2 rounded-md border border-destructive/20">{errorMessage}</p>
          )}

          <Button 
            type="submit" 
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-11 transition-colors"
            disabled={isPending}
          >
            {isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            Войти
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Нет аккаунта?{" "}
          <a href="#" className="font-medium text-primary hover:text-primary/80 transition-colors">
            Обратитесь к администратору
          </a>
        </p>
      </div>
    </div>
  );
}
