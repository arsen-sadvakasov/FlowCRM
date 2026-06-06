"use server"

import { PrismaClient } from "@prisma/client"
import { revalidatePath } from "next/cache"

const prisma = new PrismaClient()

export async function createDeal(formData: FormData) {
  const title = formData.get("title") as string
  const clientId = formData.get("clientId") as string
  const stage = formData.get("stage") as string || "NEW"

  if (!title || !clientId) return { error: "Заполните обязательные поля" }

  try {
    await prisma.deal.create({
      data: { title, clientId, stage }
    })
    revalidatePath("/deals")
    return { success: true }
  } catch (error) {
    return { error: "Ошибка" }
  }
}

export async function updateDealStage(dealId: string, newStage: string) {
  try {
    await prisma.deal.update({
      where: { id: dealId },
      data: { stage: newStage }
    })
    revalidatePath("/deals")
    return { success: true }
  } catch (error) {
    return { error: "Ошибка обновления статуса" }
  }
}
