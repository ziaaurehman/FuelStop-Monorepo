"use client";

import {
  Card,
  CardContent,
  Badge,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@repo/components";
import { Droplet, DollarSign, Leaf, Info } from "lucide-react";
import type { Stat } from "@/services/mock/active-deliveries.service";

interface StatsCardsProps {
  stats: Stat[];
}

const iconMap = {
  Droplet,
  DollarSign,
  Leaf,
};

export function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3 grid-cols-1">
      {stats.map((stat, index) => {
        const Icon = iconMap[stat.icon as keyof typeof iconMap] || Droplet;
        return (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="p-2 rounded-lg bg-muted">
                  <Icon className="h-5 w-5 text-muted-foreground" />
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <div className="flex items-baseline gap-3">
                  <p className="text-3xl font-bold">{stat.value}</p>
                  <Badge
                    variant={
                      stat.badge.variant === "success"
                        ? "default"
                        : "destructive"
                    }
                    className={
                      stat.badge.variant === "success"
                        ? "bg-green-100 text-green-700 hover:bg-green-100"
                        : ""
                    }
                  >
                    {stat.badge.text}
                  </Badge>
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center gap-2 text-xs text-primary cursor-help">
                        <Info className="h-3 w-3" />
                        <span>{stat.tooltip}</span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">{stat.tooltip}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
