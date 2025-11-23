"use client";

import { useState } from "react";
import {
  Button,
  cn,
  Input,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/components";
import { Search } from "lucide-react";
import { useSystemAlerts } from "@/hooks/queries";
import { SystemAlertsSkeleton } from "./system-alerts-skeleton";
import type { AlertTab } from "@/services/mock/dashboard-alerts.service";

export function SystemAlerts() {
  const [activeTab, setActiveTab] = useState<AlertTab>("today");
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: alerts = [],
    isLoading,
    isError,
  } = useSystemAlerts({
    tab: activeTab,
    searchQuery: searchQuery || undefined,
  });

  if (isLoading) {
    return <SystemAlertsSkeleton />;
  }

  if (isError) {
    return (
      <Card className="flex flex-col h-full">
        <CardHeader>
          <CardTitle>System Alerts</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex items-center justify-center text-muted-foreground">
          Failed to load alerts
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle>System Alerts</CardTitle>
        <p className="text-sm text-muted-foreground">
          {alerts.length} new activities{" "}
          {activeTab === "today"
            ? "today"
            : activeTab === "yesterday"
              ? "yesterday"
              : "this week"}
        </p>

        {/* Tabs */}
        <div className="flex gap-2 mt-4">
          <Button
            variant={activeTab === "today" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveTab("today")}
            className={cn(
              activeTab === "today" &&
                "bg-primary hover:bg-primary-foreground text-white"
            )}
          >
            Today
          </Button>
          <Button
            variant={activeTab === "yesterday" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveTab("yesterday")}
          >
            Yesterday
          </Button>
          <Button
            variant={activeTab === "thisWeek" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveTab("thisWeek")}
          >
            This week
          </Button>
        </div>

        {/* Search */}
        <div className="relative mt-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </CardHeader>

      <CardContent className="flex-1 overflow-y-auto space-y-3">
        {alerts.length === 0 ? (
          <div className="text-center text-muted-foreground py-8">
            No alerts found
          </div>
        ) : (
          alerts.map((alert) => {
            const Icon = alert.icon;
            return (
              <div
                key={alert.id}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div
                  className={cn(
                    "p-2 rounded-full shrink-0",
                    alert.variant === "destructive" && "bg-red-100",
                    alert.variant === "success" && "bg-green-100",
                    alert.variant === "warning" && "bg-yellow-100",
                    alert.variant === "default" && "bg-blue-100"
                  )}
                >
                  <Icon
                    className={cn(
                      "h-4 w-4",
                      alert.variant === "destructive" && "text-red-600",
                      alert.variant === "success" && "text-green-600",
                      alert.variant === "warning" && "text-yellow-600",
                      alert.variant === "default" && "text-blue-600"
                    )}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-semibold text-sm">{alert.title}</h4>
                    <span className="text-xs text-muted-foreground shrink-0">
                      {alert.time}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {alert.description}
                  </p>
                  <p className="text-sm mt-1">{alert.detail}</p>
                </div>
              </div>
            );
          })
        )}
      </CardContent>
    </Card>
  );
}
