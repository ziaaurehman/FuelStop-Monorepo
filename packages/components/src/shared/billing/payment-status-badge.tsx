import { Badge } from "../../ui/badge";

const DEFAULT_PAYMENT_STATUS_COLORS: Record<string, string> = {
  paid: "text-green-600 bg-green-50 border-green-200",
  completed: "text-green-600 bg-green-50 border-green-200",
  pending: "text-yellow-600 bg-yellow-50 border-yellow-200",
  draft: "text-gray-600 bg-gray-50 border-gray-200",
  overdue: "text-orange-600 bg-orange-50 border-orange-200",
  failed: "text-red-600 bg-red-50 border-red-200",
};

const FALLBACK_COLOR = "text-gray-600 bg-gray-50 border-gray-200";

export interface PaymentStatusBadgeProps {
  status: string;
  colorMap?: Record<string, string>;
}

export function PaymentStatusBadge({
  status,
  colorMap,
}: PaymentStatusBadgeProps) {
  const normalized = status.toLowerCase();
  const className =
    colorMap?.[normalized] ??
    DEFAULT_PAYMENT_STATUS_COLORS[normalized] ??
    FALLBACK_COLOR;

  return (
    <Badge variant="outline" className={className}>
      <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current" />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
}

