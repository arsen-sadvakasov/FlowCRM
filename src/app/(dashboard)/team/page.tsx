import { PrismaClient } from "@prisma/client";
import { TeamClient } from "./team-client";

const prisma = new PrismaClient();

export default async function TeamPage() {
  const users = await prisma.user.findMany({
    orderBy: { role: "asc" }
  });

  return <TeamClient initialUsers={users} />;
}
