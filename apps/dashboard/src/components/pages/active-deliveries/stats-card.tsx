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

const stats = [
  {
    icon: Droplet,
    label: "Monthly Fuel Consumption",
    value: "486 gal",
    badge: {
      text: "5% Efficiency Gain",
      variant: "success" as const,
    },
    tooltip: "Real-time data from LCRI.Q® device integrations",
  },
  {
    icon: DollarSign,
    label: "Estimated Savings",
    value: "$0.32",
    badge: {
      text: "8% above target",
      variant: "success" as const,
    },
    tooltip: "per gallon vs. market rates",
  },
  {
    icon: Leaf,
    label: "CO₂ Reduction",
    value: "2.1 tons",
    badge: {
      text: "18% lower idle time",
      variant: "destructive" as const,
    },
    tooltip: "Equivalent to planting 32 trees",
  },
];

export function StatsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-3 grid-cols-1">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
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
