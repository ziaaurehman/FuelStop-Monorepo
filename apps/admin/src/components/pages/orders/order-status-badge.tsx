import { Badge, getStatusColor } from "@repo/components";
import { Calendar, CircleCheck, Clock3 } from "lucide-react";
import type { Order } from "@/data/orders";

interface OrderStatusBadgeProps {
  status: Order["status"];
}

export function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  return (
    <Badge variant="secondary" className={getStatusColor(status)}>
      {status === "in transit" ? (
        <>
          <span className="mr-1 h-2 w-2 rounded-full bg-current animate-pulse" />
          {status}
        </>
      ) : status === "scheduled" ? (
        <>
          <Calendar className="mr-1 h-3 w-3" />
          {status}
        </>
      ) : status === "delivered" ? (
        <>
          <CircleCheck className="mr-1 h-3 w-3" />
          {status}
        </>
      ) : status === "pending" ? (
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
