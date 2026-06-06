import { PrismaClient } from "@prisma/client";
import ClientsClient from "./clients-client";

const prisma = new PrismaClient();

export default async function ClientsPage() {
  const clients = await prisma.client.findMany({
    orderBy: { createdAt: "desc" },
    include: { deals: true }
  });

  return <ClientsClient clients={clients} />;
}
