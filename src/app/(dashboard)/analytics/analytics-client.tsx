"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

const PIE_COLORS = ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#64748b'];

export function AnalyticsClient({ dealsByStage, revenueByManager }: { dealsByStage: any[], revenueByManager: any[] }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Deals by Stage - Pie Chart */}
      <div className="bg-card p-6 rounded-2xl border border-border shadow-sm transition-all hover:shadow-md">
        <h2 className="text-lg font-bold text-foreground mb-6">Сделки по этапам</h2>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={dealsByStage}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
                nameKey="name"
                animationDuration={1500}
              >
                {dealsByStage.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  borderRadius: '12px', 
                  border: '1px solid var(--color-border, #f1f5f9)', 
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  backgroundColor: 'var(--color-card, #ffffff)',
                  color: 'var(--color-foreground, #000000)'
                }}
                itemStyle={{ color: 'var(--color-foreground, #000000)' }}
                labelStyle={{ color: 'var(--color-muted-foreground, #64748b)' }}
                formatter={(value: number) => [`${value} шт.`, 'Количество']}
              />
              <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ color: 'var(--color-foreground, #000)' }}/>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Revenue by Manager - Bar Chart */}
      <div className="bg-card p-6 rounded-2xl border border-border shadow-sm transition-all hover:shadow-md">
        <h2 className="text-lg font-bold text-foreground mb-6">Выручка по менеджерам</h2>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={revenueByManager} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border, #f1f5f9)" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: 'var(--color-muted-foreground, #64748b)', fontSize: 12 }} 
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: 'var(--color-muted-foreground, #64748b)', fontSize: 12 }}
                tickFormatter={(value) => `${value >= 1000 ? value / 1000 + 'k' : value}`}
              />
              <Tooltip 
                contentStyle={{ 
                  borderRadius: '12px', 
                  border: '1px solid var(--color-border, #f1f5f9)', 
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  backgroundColor: 'var(--color-card, #ffffff)',
                  color: 'var(--color-foreground, #000000)'
                }}
                itemStyle={{ color: 'var(--color-foreground, #000000)' }}
                labelStyle={{ color: 'var(--color-muted-foreground, #64748b)' }}
                formatter={(value: number) => [`${value.toLocaleString('ru-RU')} ₽`, 'Выручка']}
                cursor={{ fill: 'var(--color-muted, #f8fafc)' }}
              />
              <Bar dataKey="value" fill="#3b82f6" radius={[6, 6, 0, 0]} animationDuration={1500} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
