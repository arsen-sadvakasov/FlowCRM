import { PrismaClient } from "@prisma/client";
import DealsClient from "./deals-client";

const prisma = new PrismaClient();

export default async function DealsPage() {
  const deals = await prisma.deal.findMany({
    include: { client: true },
    orderBy: { createdAt: "desc" },
  });

  const clients = await prisma.client.findMany({
    orderBy: { name: "asc" },
  });

  return <DealsClient initialDeals={deals} clients={clients} />;
}
