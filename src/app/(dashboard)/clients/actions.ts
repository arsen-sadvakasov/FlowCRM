"use server"

import { PrismaClient } from "@prisma/client"
import { revalidatePath } from "next/cache"

const prisma = new PrismaClient()

export async function createClient(formData: FormData) {
  const name = formData.get("name") as string
  const phone = formData.get("phone") as string
  const email = formData.get("email") as string | null
  const company = formData.get("company") as string | null

  if (!name || !phone) {
    return { error: "Имя и телефон обязательны" }
  }

  try {
    await prisma.client.create({
      data: { name, phone, email, company }
    })
    revalidatePath("/clients")
    return { success: true }
  } catch (error) {
    return { error: "Ошибка при создании клиента" }
  }
}
