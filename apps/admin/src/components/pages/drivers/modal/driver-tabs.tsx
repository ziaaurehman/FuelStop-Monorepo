"use client";

import { useState } from "react";
import { Button, cn } from "@repo/components";
import { LiveMap } from "./live-map";
import { ShiftCalendar } from "./shift-calender";

type TabType = "map" | "calendar";

export function DriverTabs() {
  const [activeTab, setActiveTab] = useState<TabType>("map");

  return (
    <div className="space-y-4">
      {/* Tab Buttons */}
      <div className="flex items-center gap-2 border-b overflow-x-auto">
        <Button
          variant="ghost"
          className={cn(
            "rounded-b-none",
            activeTab === "map"
              ? "border-b-2 border-primary text-primary"
              : "text-muted-foreground"
          )}
          onClick={() => setActiveTab("map")}
        >
          Live Map
        </Button>

        <Button
          variant="ghost"
          className={cn(
            "rounded-b-none",
            activeTab === "calendar"
              ? "border-b-2 border-primary text-primary"
              : "text-muted-foreground"
          )}
          onClick={() => setActiveTab("calendar")}
        >
          Shift Calendar
        </Button>
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        {activeTab === "map" && <LiveMap />}
        {activeTab === "calendar" && <ShiftCalendar />}
      </div>
    </div>
  );
}
