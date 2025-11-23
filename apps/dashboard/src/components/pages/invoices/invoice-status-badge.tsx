"use client";

import { Badge } from "@repo/components";
import type { InvoiceStatus } from "@/services/mock/invoices.service";

interface InvoiceStatusBadgeProps {
  status: InvoiceStatus;
}

/**
 * Get invoice status color class
 */
function getInvoiceStatusColor(status: InvoiceStatus): string {
  switch (status) {
    case "paid":
      return "text-green-600 bg-green-50 border-green-200";
    case "draft":
      return "text-gray-600 bg-gray-50 border-gray-200";
    case "overdue":
      return "text-orange-600 bg-orange-50 border-orange-200";
    case "offline":
      return "text-slate-600 bg-slate-50 border-slate-200";
    default:
      return "text-gray-600 bg-gray-50 border-gray-200";
  }
}

export function InvoiceStatusBadge({ status }: InvoiceStatusBadgeProps) {
  return (
    <Badge variant="outline" className={getInvoiceStatusColor(status)}>
      <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current" />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
}

