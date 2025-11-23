"use client";

import { Badge } from "@repo/components";
import type { PaymentStatus } from "@/services/mock/invoices.service";

interface PaymentStatusBadgeProps {
  status: PaymentStatus;
}

/**
 * Get payment status color class
 */
function getPaymentStatusColor(status: PaymentStatus): string {
  switch (status) {
    case "completed":
      return "text-green-600 bg-green-50 border-green-200";
    case "pending":
      return "text-yellow-600 bg-yellow-50 border-yellow-200";
    case "failed":
      return "text-red-600 bg-red-50 border-red-200";
    default:
      return "text-gray-600 bg-gray-50 border-gray-200";
  }
}

export function PaymentStatusBadge({ status }: PaymentStatusBadgeProps) {
  return (
    <Badge variant="outline" className={getPaymentStatusColor(status)}>
      <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current" />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
}

