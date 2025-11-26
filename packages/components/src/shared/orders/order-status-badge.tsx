import { Calendar, CircleCheck, Clock3 } from "lucide-react";
import { Badge } from "../../ui/badge";
import { getStatusColor } from "../../lib";

export interface OrderStatusBadgeProps {
  status: string;
}

export function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  const normalized = status.toLowerCase();

  return (
    <Badge variant="secondary" className={getStatusColor(normalized)}>
      {normalized === "in transit" ? (
        <>
          <span className="mr-1 h-2 w-2 rounded-full bg-current animate-pulse" />
          {status}
        </>
      ) : normalized === "scheduled" ? (
        <>
          <Calendar className="mr-1 h-3 w-3" />
          {status}
        </>
      ) : normalized === "delivered" ? (
        <>
          <CircleCheck className="mr-1 h-3 w-3" />
          {status}
        </>
      ) : normalized === "pending" ? (
        <>
          <Clock3 className="mr-1 h-3 w-3" />
          {status}
        </>
      ) : (
        status
      )}
    </Badge>
  );
}

