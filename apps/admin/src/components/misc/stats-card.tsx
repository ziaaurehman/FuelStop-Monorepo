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
import { Info, ArrowUp, ArrowDown } from "lucide-react";

export type StatItem = {
  icon: React.ElementType;
  label: string;
  value: string;
  badge?: {
    text: string;
    variant?: "success" | "destructive" | "default";
  };
  tooltip?: string;
};

interface StatsCardProps {
  stat: StatItem;
}

export function StatsCard({ stat }: StatsCardProps) {
  const Icon = stat.icon;
  const variant = stat.badge?.variant;

  const renderBadgeContent = () => {
    if (!stat.badge) return null;

    const isSuccess = variant === "success";
    const isDestructive = variant === "destructive";
    const isDefault = variant === "default" || !variant;

    return (
      <Badge
        variant={
          isSuccess ? "default" : isDestructive ? "destructive" : "outline"
        }
        className={`flex items-center gap-1 px-2 py-0.5 text-xs text-nowrap font-medium
          ${
            isSuccess
              ? "bg-green-100 text-green-700 hover:bg-green-100"
              : isDestructive
                ? "bg-red-100 text-red-700 hover:bg-red-100"
                : isDefault
                  ? "text-muted-foreground bg-transparent border-none hover:bg-transparent"
                  : ""
          }`}
      >
        {isSuccess && (
          <div className="flex items-center justify-center w-4 h-4 rounded-full bg-green-500 text-white">
            <ArrowUp className="h-3 w-3" />
          </div>
        )}
        {isDestructive && (
          <div className="flex items-center justify-center w-4 h-4 rounded-full bg-red-500 text-white">
            <ArrowDown className="h-3 w-3" />
          </div>
        )}
        <span>{stat.badge.text}</span>
      </Badge>
    );
  };

  return (
    <Card className="w-full h-full overflow-hidden">
      <CardContent className="p-4 sm:p-6">
        {/* Header Icon */}
        <div className="flex items-start justify-between mb-4">
          <div className="p-2 rounded-lg bg-muted flex-shrink-0">
            <Icon className="h-5 w-5 text-muted-foreground" />
          </div>
        </div>

        {/* Content */}
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground break-words">
            {stat.label}
          </p>

          <div className="flex items-baseline gap-2 sm:gap-3">
            <p className="text-2xl font-semibold text-nowrap">
              {stat.value}
            </p>
            {renderBadgeContent()}
          </div>

          {/* Tooltip — only render if provided */}
          {stat.tooltip && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-2 text-xs text-primary cursor-help mt-1">
                    <Info className="h-3 w-3 flex-shrink-0" />
                    <span className="truncate">{stat.tooltip}</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">{stat.tooltip}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
