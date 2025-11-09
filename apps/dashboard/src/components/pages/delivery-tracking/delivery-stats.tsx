import React from "react";
import { cn } from "@/lib";

interface Stat {
  label: string;
  value: string;
  bgColor: string;
  textColor: string;
}

interface DeliveryStatsProps {
  stats: Stat[];
}

export const DeliveryStats: React.FC<DeliveryStatsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={cn(
            "rounded-xl p-6 transition-all hover:shadow-md",
            stat.bgColor
          )}
        >
          <div className="text-sm font-medium text-muted-foreground mb-2">
            {stat.label}
          </div>
          <div className={cn("text-3xl font-bold", stat.textColor)}>
            {stat.value}
          </div>
        </div>
      ))}
    </div>
  );
};
