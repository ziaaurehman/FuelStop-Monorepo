"use client";

import { useMemo, useCallback } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/components";
import { useBillingStore } from "@/stores/billing-store";
import { Invoices } from "./invoices";
import { Payments } from "./payments";
import { TotalProfit } from "./total-profit";
import { PaymentMethods } from "./payment-methods";

/**
 * Billing tabs component for switching between invoices, payments, and reports.
 */
export function BillingTabs() {
  // Use selective subscriptions to prevent unnecessary re-renders
  const activeTab = useBillingStore((state) => state.activeTab);
  const setActiveTab = useBillingStore((state) => state.setActiveTab);
  const timeRange = useBillingStore((state) => state.timeRange);

  // Memoize timeRange to prevent unnecessary re-renders of TotalProfit
  const memoizedTimeRange = useMemo(() => timeRange, [timeRange]);

  const handleTabChange = useCallback(
    (value: string) => {
      setActiveTab(value as "invoices" | "payments" | "reports");
    },
    [setActiveTab]
  );

  return (
    <Tabs value={activeTab} onValueChange={handleTabChange}>
      <TabsList>
        <TabsTrigger value="invoices">Invoices</TabsTrigger>
        <TabsTrigger value="payments">Payments</TabsTrigger>
        <TabsTrigger value="reports">Reports</TabsTrigger>
      </TabsList>
      <TabsContent value="invoices">
        <Invoices />
      </TabsContent>
      <TabsContent value="payments">
        <Payments />
      </TabsContent>
      <TabsContent value="reports">
        <div className="grid gap-6 lg:grid-cols-3 grid-cols-1">
          {/* Fuel Consumption Chart - 2 columns */}
          <div className="lg:col-span-2">
            <TotalProfit timeRange={memoizedTimeRange} />
          </div>

          {/* Efficiency Insights - 1 column */}
          <div className="lg:col-span-1">
            <PaymentMethods />
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
}

