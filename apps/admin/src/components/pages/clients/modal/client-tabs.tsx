"use client";

import { useState } from "react";
import { Button, cn } from "@repo/components";
import { BillingInfo } from "./billing-info";
import { DeliveryHistory } from "./delivery-history";


type TabType = "billing" | "history";


export function ClientTabs() {
  const [activeTab, setActiveTab] = useState<TabType>("billing");

  return (
    <div className="space-y-4">
      {/* Tab Buttons */}
      <div className="flex items-center gap-2 border-b overflow-x-auto">
        <Button
          variant="ghost"
          className={cn(
            "rounded-b-none",
            activeTab === "billing"
              ? "border-b-2 border-primary text-primary"
              : "text-muted-foreground"
          )}
          onClick={() => setActiveTab("billing")}
        >
          Billing Info
        </Button>

        <Button
          variant="ghost"
          className={cn(
            "rounded-b-none",
            activeTab === "history"
              ? "border-b-2 border-primary text-primary"
              : "text-muted-foreground"
          )}
          onClick={() => setActiveTab("history")}
        >
          Delivery History
        </Button>
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        {activeTab === "billing" && <BillingInfo  />}
        {activeTab === "history" && <DeliveryHistory />}
      </div>
    </div>
  );
}
