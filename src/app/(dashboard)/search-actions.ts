"use server"

import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function searchGlobal(query: string) {
  if (!query || query.length < 2) return { clients: [], deals: [], tasks: [] }

  const [clients, deals, tasks] = await Promise.all([
    prisma.client.findMany({
      where: {
        OR: [
          { name: { contains: query } },
          { company: { contains: query } },
          { email: { contains: query } },
          { phone: { contains: query } }
        ]
      },
      take: 5
    }),
    prisma.deal.findMany({
      where: {
        title: { contains: query }
      },
      take: 5,
      include: { client: true }
    }),
    prisma.task.findMany({
      where: {
        title: { contains: query }
      },
      take: 5
    })
  ])

  return { clients, deals, tasks }
}
