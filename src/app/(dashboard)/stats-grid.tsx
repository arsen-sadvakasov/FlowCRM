"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Users, FolderKanban, CheckCircle2, TrendingUp, ArrowUpRight } from "lucide-react";

const ICONS = {
  Users,
  FolderKanban,
  CheckCircle2,
  TrendingUp,
};

type StatProps = {
  title: string;
  value: string;
  trend: string;
  trendUp: boolean;
  iconName: string;
  color: string;
  lightColor: string;
  textColor: string;
  href: string;
};

export function StatsGrid({ stats }: { stats: StatProps[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, i) => {
        const Icon = ICONS[stat.iconName as keyof typeof ICONS];
        
        return (
          <Link href={stat.href} key={i}>
            <motion.div
              whileHover={{ scale: 1.03, y: -4 }}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 20,
                delay: i * 0.1 
              }}
              className="bg-card p-6 rounded-2xl border border-border shadow-sm hover:shadow-xl hover:border-primary/50 transition-all duration-300 relative overflow-hidden group h-full cursor-pointer"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl ${stat.lightColor} dark:bg-opacity-20 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-6 h-6 ${stat.textColor}`} />
                </div>
                <div className={`flex items-center gap-1 text-sm font-medium px-2 py-1 rounded-md ${
                  stat.trendUp ? 'text-green-700 bg-green-500/10 dark:text-green-400' : 'text-red-700 bg-red-500/10 dark:text-red-400'
                }`}>
                  {stat.trendUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowUpRight className="w-3 h-3 rotate-90" />}
                  {stat.trend}
                </div>
              </div>
              <div>
                <h3 className="text-muted-foreground text-sm font-medium mb-1">{stat.title}</h3>
                <p className="text-3xl font-bold text-foreground group-hover:text-primary transition-colors">{stat.value}</p>
              </div>
              {/* Decorative background gradient */}
              <div className={`absolute -bottom-6 -right-6 w-32 h-32 rounded-full blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 ${stat.color}`} />
            </motion.div>
          </Link>
        );
      })}
    </div>
  );
}
