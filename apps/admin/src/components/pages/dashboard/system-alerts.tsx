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
import {
  Search,
  Truck,
  AlertCircle,
  UserPlus,
  AlertTriangle,
} from "lucide-react";

type AlertTab = "today" | "yesterday" | "thisWeek";

const alerts = [
  {
    id: 1,
    type: "delay",
    icon: Truck,
    title: "Driver Delayed",
    description: "ETA 45 mins late",
    detail: "John Smith (#FS-001)",
    time: "11:30 AM",
    variant: "default" as const,
  },
  {
    id: 2,
    type: "failed",
    icon: AlertCircle,
    title: "Delivery Failed",
    description: "Customer unavailable — Metro Gas Station",
    detail: "Assigned driver: John Smith",
    time: "11:30 AM",
    variant: "destructive" as const,
  },
  {
    id: 3,
    type: "failed",
    icon: AlertCircle,
    title: "Delivery Failed",
    description: "Customer unavailable — Metro Gas Station",
    detail: "Assigned driver: John Smith",
    time: "11:30 AM",
    variant: "destructive" as const,
  },
  {
    id: 4,
    type: "success",
    icon: UserPlus,
    title: "New Driver Added",
    description: "Successfully onboarded to fleet",
    detail: "Michael Carter",
    time: "11:30 AM",
    variant: "success" as const,
  },
  {
    id: 5,
    type: "warning",
    icon: AlertTriangle,
    title: "Driver Warning",
    description: "Speeding detected",
    detail: "Mike Wilson (#FS-003)",
    time: "11:30 AM",
    variant: "warning" as const,
  },
];

export function SystemAlerts() {
  const [activeTab, setActiveTab] = useState<AlertTab>("today");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredAlerts = alerts.filter(
    (alert) =>
      alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle>System Alerts</CardTitle>
        <p className="text-sm text-muted-foreground">5 new activities today</p>

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
        {filteredAlerts.map((alert) => {
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
        })}
      </CardContent>
    </Card>
  );
}
