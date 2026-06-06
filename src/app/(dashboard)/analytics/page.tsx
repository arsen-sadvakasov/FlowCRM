import { PrismaClient } from "@prisma/client";
import { AnalyticsClient } from "./analytics-client";

const prisma = new PrismaClient();

export default async function AnalyticsPage() {
  const deals = await prisma.deal.findMany({
    include: { assignedTo: true }
  });

  const stageNames: Record<string, string> = {
    NEW: "Новые",
    CONTACT_MADE: "В работе",
    PROPOSAL_SENT: "Предложение",
    NEGOTIATION: "Переговоры",
    WON: "Успешно",
    LOST: "Отказ"
  };

  const stageCount: Record<string, number> = {};
  deals.forEach(deal => {
    const stageName = stageNames[deal.stage] || deal.stage;
    stageCount[stageName] = (stageCount[stageName] || 0) + 1;
  });

  const dealsByStage = Object.entries(stageCount).map(([name, value]) => ({ name, value }));

  const managerRevenue: Record<string, number> = {};
  deals.forEach(deal => {
    if (deal.value && deal.assignedTo) {
      const managerName = deal.assignedTo.name;
      managerRevenue[managerName] = (managerRevenue[managerName] || 0) + deal.value;
    }
  });

  const revenueByManager = Object.entries(managerRevenue).map(([name, value]) => ({ name, value }));

  const defaultDealsByStage = dealsByStage.length > 0 ? dealsByStage : [
    { name: "Новые", value: 12 },
    { name: "В работе", value: 8 },
    { name: "Успешно", value: 15 },
    { name: "Отказ", value: 4 },
  ];

  const defaultRevenueByManager = revenueByManager.length > 0 ? revenueByManager : [
    { name: "Иван Иванов", value: 450000 },
    { name: "Анна Смирнова", value: 380000 },
    { name: "Петр Петров", value: 120000 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Аналитика</h1>
        <p className="text-sm text-muted-foreground mt-1">Отчеты и графики по продажам.</p>
      </div>

      <AnalyticsClient 
        dealsByStage={defaultDealsByStage} 
        revenueByManager={defaultRevenueByManager} 
      />
    </div>
  );
}
