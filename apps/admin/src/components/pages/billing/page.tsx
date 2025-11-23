"use client";

import { BillingStatsGrid } from "./billing-stats-grid";
import { BillingTabs } from "./billing-tabs";
import { useBillingUrlSync } from "@/hooks/use-billing-url-sync";

/**
 * Main billing page component.
 * Manages billing statistics, invoices, payments, and reports.
 */
export default function BillingPage() {
  useBillingUrlSync();

  return (
    <div className="space-y-4">
      <BillingStatsGrid />
      <BillingTabs />
    </div>
  );
}
