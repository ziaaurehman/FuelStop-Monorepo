"use client";

import { Badge } from "@repo/components";
import { Invoice, getInvoiceStatusColor } from "@/data";

interface InvoiceStatusBadgeProps {
  status: Invoice["status"];
}

/**
 * Reusable component for displaying invoice status as a badge.
 */
export function InvoiceStatusBadge({ status }: InvoiceStatusBadgeProps) {
  return (
    <Badge variant="outline" className={getInvoiceStatusColor(status)}>
      <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current" />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
}
