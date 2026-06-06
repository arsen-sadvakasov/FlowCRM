import { PrismaClient } from "@prisma/client";
import TasksClient from "./tasks-client";

const prisma = new PrismaClient();

export default async function TasksPage() {
  const tasks = await prisma.task.findMany({
    include: { assignedTo: true },
    orderBy: { createdAt: "desc" },
  });

  const users = await prisma.user.findMany({
    orderBy: { name: "asc" },
  });

  return <TasksClient initialTasks={tasks} users={users} />;
}
