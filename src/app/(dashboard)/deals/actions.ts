"use server"

import { PrismaClient } from "@prisma/client"
import { revalidatePath } from "next/cache"
import { sendTelegramNotification } from "@/lib/telegram"

const prisma = new PrismaClient()

export async function createDeal(formData: FormData) {
  const title = formData.get("title") as string
  const clientId = formData.get("clientId") as string
  const stage = formData.get("stage") as string || "NEW"

  if (!title || !clientId) return { error: "Заполните обязательные поля" }

  try {
    const deal = await prisma.deal.create({
      data: { title, clientId, stage }
    })
    
    // Отправляем уведомление
    await sendTelegramNotification(`🟢 <b>Новая сделка!</b>\nНазвание: ${title}\nСумма: ${deal.value || 'Не указана'}`);
    
    revalidatePath("/deals")
    return { success: true }
  } catch (error) {
    return { error: "Ошибка" }
  }
}

export async function updateDealStage(dealId: string, newStage: string) {
  try {
    const deal = await prisma.deal.update({
      where: { id: dealId },
      data: { stage: newStage }
    })
    
    // Отправляем уведомление
    const stageNames: Record<string, string> = {
      NEW: "Новые",
      CONTACT_MADE: "В работе",
      PROPOSAL_SENT: "Предложение",
      NEGOTIATION: "Переговоры",
      WON: "Успешно",
      LOST: "Отказ"
    };
    
    await sendTelegramNotification(`🔄 <b>Статус сделки изменен</b>\nСделка: ${deal.title}\nНовый этап: ${stageNames[newStage] || newStage}`);
    
    revalidatePath("/deals")
    return { success: true }
  } catch (error) {
    return { error: "Ошибка обновления статуса" }
  }
}
