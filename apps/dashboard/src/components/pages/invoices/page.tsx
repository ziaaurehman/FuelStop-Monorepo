"use client";

import { useInvoicesUrlSync } from "@/hooks/use-invoices-url-sync";
import { useInvoicesStore } from "@/stores/invoices-store";
import { InvoicesTabs } from "./invoices-tabs";
import { InvoiceStatusFilter } from "./invoice-status-filter";
import { PaymentStatusFilter } from "./payment-status-filter";

export default function InvoicesPage() {
  useInvoicesUrlSync();
  const { activeTab } = useInvoicesStore();

  return (
    <div className="space-y-4">
      {/* Status Filter */}
      <div className="flex items-center justify-between">
        {activeTab === "invoices" ? (
          <InvoiceStatusFilter />
        ) : (
          <PaymentStatusFilter />
        )}
      </div>

      {/* Tabs */}
      <InvoicesTabs />
    </div>
  );
}
