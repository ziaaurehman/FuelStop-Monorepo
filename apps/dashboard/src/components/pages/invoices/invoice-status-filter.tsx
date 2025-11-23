"use client";

import { Button } from "@repo/components";
import { cn } from "@/lib";
import { useInvoicesStore } from "@/stores/invoices-store";
import type { InvoiceStatusFilter } from "@/stores/invoices-store";

const statusOptions: Array<{ label: string; value: InvoiceStatusFilter }> = [
  { label: "All", value: "all" },
  { label: "Draft", value: "draft" },
  { label: "Paid", value: "paid" },
  { label: "Overdue", value: "overdue" },
  { label: "Offline", value: "offline" },
];

export function InvoiceStatusFilter() {
  const { statusFilter, setStatusFilter } = useInvoicesStore();

  return (
    <div className="inline-flex rounded-lg border bg-muted p-1">
      {statusOptions.map((option) => (
        <Button
          key={option.value}
          variant="ghost"
          size="sm"
          className={cn(
            "rounded-md px-4",
            statusFilter === option.value &&
              "bg-background shadow-sm hover:bg-background"
          )}
          onClick={() => setStatusFilter(option.value)}
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
}

