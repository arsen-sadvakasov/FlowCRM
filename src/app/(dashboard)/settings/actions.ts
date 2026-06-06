"use server"

import { PrismaClient } from "@prisma/client"
import { revalidatePath } from "next/cache"
import bcrypt from "bcryptjs"
import { auth } from "@/lib/auth"

const prisma = new PrismaClient()

export async function updateProfile(formData: FormData) {
  const session = await auth()
  if (!session?.user?.id) return { error: "Не авторизован" }
  
  const userId = (session.user as any).id as string
  const name = formData.get("name") as string
  const email = formData.get("email") as string

  if (!name || !email) return { error: "Заполните обязательные поля" }

  try {
    await prisma.user.update({
      where: { id: userId },
      data: { name, email }
    })
    
    revalidatePath("/settings")
    return { success: true }
  } catch (error) {
    return { error: "Ошибка при обновлении профиля" }
  }
}

export async function updatePassword(formData: FormData) {
  const session = await auth()
  if (!session?.user?.id) return { error: "Не авторизован" }
  
  const userId = (session.user as any).id as string
  const currentPassword = formData.get("currentPassword") as string
  const newPassword = formData.get("newPassword") as string

  if (!currentPassword || !newPassword) return { error: "Заполните оба поля" }
  if (newPassword.length < 6) return { error: "Новый пароль должен быть не менее 6 символов" }

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } })
    if (!user) return { error: "Пользователь не найден" }

    const passwordsMatch = await bcrypt.compare(currentPassword, user.password)
    if (!passwordsMatch) return { error: "Текущий пароль неверен" }

    const hashedPassword = await bcrypt.hash(newPassword, 10)

    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword }
    })
    
    return { success: true }
  } catch (error) {
    return { error: "Ошибка при обновлении пароля" }
  }
}
