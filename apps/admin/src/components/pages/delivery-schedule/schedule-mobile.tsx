"use client";

import { useState } from "react";
import { Button } from "@repo/components";
import { DeliveryCard } from "./delivery-card";
import { scheduleData } from "@/data";
import { Plus, Filter } from "lucide-react";
import { cn } from "@/lib";

type TabType =
  | "scheduled"
  | "assigned"
  | "in-progress"
  | "completed"
  | "blocked";

interface ScheduleMobileProps {
  onAddClick: () => void;
}

export function ScheduleMobile({ onAddClick }: ScheduleMobileProps) {
  const [activeTab, setActiveTab] = useState<TabType>("scheduled");

  const tabs = [
    {
      id: "scheduled" as TabType,
      label: "Scheduled",
      count: scheduleData.scheduled?.length || 0,
    },
    {
      id: "assigned" as TabType,
      label: "Assigned",
      count: scheduleData.assigned?.length || 0,
    },
    {
      id: "in-progress" as TabType,
      label: "In Progress",
      count: scheduleData["in-progress"]?.length || 0,
    },
    {
      id: "completed" as TabType,
      label: "Completed",
      count: scheduleData.completed?.length || 0,
    },
  ];

  return (
    <div className="space-y-4">
      {/* Filter Button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 bg-muted rounded-lg p-1">
          <Button variant="ghost" size="sm" className="bg-background shadow-sm">
            Board
          </Button>
          <Button variant="ghost" size="sm">
            Calendar
          </Button>
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      {/* Tabs */}
      <div className="overflow-x-auto hide-scrollbar">
        <div className="flex items-center gap-6 border-b min-w-max px-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "pb-3 px-1 text-sm font-medium whitespace-nowrap transition-colors relative",
                activeTab === tab.id
                  ? "text-foreground"
                  : "text-muted-foreground"
              )}
            >
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "h-2 w-2 rounded-full",
                    tab.id === "scheduled" && "bg-gray-400",
                    tab.id === "assigned" && "bg-blue-500",
                    tab.id === "in-progress" && "bg-orange-500",
                    tab.id === "completed" && "bg-green-500",
                    tab.id === "blocked" && "bg-red-500"
                  )}
                />
                {tab.label}
              </div>
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Column Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-semibold capitalize">
          {activeTab.replace("-", " ")}
        </h3>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <span className="text-lg">•••</span>
        </Button>
      </div>

      {/* Cards */}
      <div className="space-y-3">
        {scheduleData[activeTab]?.map((delivery) => (
          <DeliveryCard key={delivery.id} delivery={delivery} />
        ))}
      </div>

      {/* Add Button */}
      <Button onClick={onAddClick} variant="outline" className="w-full">
        <Plus className="mr-2 h-4 w-4" />
        Add
      </Button>
    </div>
  );
}
