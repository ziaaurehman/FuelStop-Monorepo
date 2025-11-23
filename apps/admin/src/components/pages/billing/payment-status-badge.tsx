"use client";

import { Badge } from "@repo/components";
import { Payment, getPaymentStatusColor } from "@/data";

interface PaymentStatusBadgeProps {
  status: Payment["status"];
}

/**
 * Reusable component for displaying payment status as a badge.
 */
export function PaymentStatusBadge({ status }: PaymentStatusBadgeProps) {
  return (
    <Badge variant="outline" className={getPaymentStatusColor(status)}>
      <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current" />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
}
