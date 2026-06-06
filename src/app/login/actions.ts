"use server"

import { signIn, signOut } from "@/lib/auth"
import { AuthError } from "next-auth"

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn("credentials", formData)
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Неверный email или пароль."
        default:
          return "Произошла ошибка при входе."
      }
    }
    throw error
  }
}

export async function logout() {
  await signOut({ redirectTo: "/login" })
}
