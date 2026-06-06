"use server"

import { PrismaClient } from "@prisma/client"
import { revalidatePath } from "next/cache"
import { sendTelegramNotification } from "@/lib/telegram"

const prisma = new PrismaClient()

export async function createTask(formData: FormData) {
  const title = formData.get("title") as string
  const assignedToId = formData.get("assignedToId") as string

  if (!title) return { error: "Заполните название" }

  try {
    await prisma.task.create({
      data: { 
        title, 
        assignedToId: assignedToId || undefined
      }
    })
    
    // Отправляем уведомление
    await sendTelegramNotification(`📝 <b>Новая задача!</b>\nНазвание: ${title}`);
    
    revalidatePath("/tasks")
    return { success: true }
  } catch (error) {
    return { error: "Ошибка" }
  }
}

export async function toggleTaskStatus(taskId: string, isCompleted: boolean) {
  try {
    const task = await prisma.task.update({
      where: { id: taskId },
      data: { status: isCompleted ? "COMPLETED" : "TODO" }
    })
    
    if (isCompleted) {
      await sendTelegramNotification(`✅ <b>Задача выполнена</b>\nНазвание: ${task.title}`);
    }
    
    revalidatePath("/tasks")
  } catch (error) {
    console.error(error)
  }
}
