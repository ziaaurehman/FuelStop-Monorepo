"use client";

import { useMemo } from "react";
import { Button } from "@repo/components";
import { cn } from "@/lib";
import { useInvoicesStore } from "@/stores/invoices-store";
import type { PaymentStatusFilter } from "@/hooks/queries/use-payments";
import type { InvoiceStatusFilter } from "@/stores/invoices-store";

const statusOptions: Array<{ label: string; value: PaymentStatusFilter }> = [
  { label: "All", value: "all" },
  { label: "Completed", value: "completed" },
  { label: "Pending", value: "pending" },
  { label: "Failed", value: "failed" },
];

export function PaymentStatusFilter() {
  const { statusFilter, setStatusFilter } = useInvoicesStore();

  // Convert InvoiceStatusFilter to PaymentStatusFilter for payments
  const paymentStatusFilter: PaymentStatusFilter = useMemo(() => {
    if (statusFilter === "all") return "all";
    if (statusFilter === "paid") return "completed";
    if (statusFilter === "draft") return "pending";
    if (statusFilter === "overdue") return "pending";
    return "all";
  }, [statusFilter]);

  const handleStatusChange = (value: PaymentStatusFilter) => {
    // Convert PaymentStatusFilter back to InvoiceStatusFilter
    // For payments, we map: completed -> paid, pending -> draft, failed -> overdue
    const invoiceStatus: "all" | "draft" | "paid" | "overdue" | "offline" =
      value === "all"
        ? "all"
        : value === "completed"
        ? "paid"
        : value === "pending"
        ? "draft"
        : "overdue";
    setStatusFilter(invoiceStatus);
  };

  return (
    <div className="inline-flex rounded-lg border bg-muted p-1">
      {statusOptions.map((option) => (
        <Button
          key={option.value}
          variant="ghost"
          size="sm"
          className={cn(
            "rounded-md px-4",
            paymentStatusFilter === option.value &&
              "bg-background shadow-sm hover:bg-background"
          )}
          onClick={() => handleStatusChange(option.value)}
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
}

