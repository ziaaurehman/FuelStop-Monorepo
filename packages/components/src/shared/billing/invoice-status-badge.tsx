import { Badge } from "../../ui/badge";

const DEFAULT_INVOICE_STATUS_COLORS: Record<string, string> = {
  paid: "text-green-600 bg-green-50 border-green-200",
  draft: "text-gray-600 bg-gray-50 border-gray-200",
  overdue: "text-orange-600 bg-orange-50 border-orange-200",
  offline: "text-slate-600 bg-slate-50 border-slate-200",
};

const FALLBACK_COLOR = "text-gray-600 bg-gray-50 border-gray-200";

export interface InvoiceStatusBadgeProps {
  status: string;
  colorMap?: Record<string, string>;
}

export function InvoiceStatusBadge({
  status,
  colorMap,
}: InvoiceStatusBadgeProps) {
  const normalized = status.toLowerCase();
  const className =
    colorMap?.[normalized] ??
    DEFAULT_INVOICE_STATUS_COLORS[normalized] ??
    FALLBACK_COLOR;

  return (
    <Badge variant="outline" className={className}>
      <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current" />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
}

