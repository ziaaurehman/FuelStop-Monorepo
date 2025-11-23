import { Badge } from "@repo/components";
import { getPriorityColor } from "@/lib";
import type { Order } from "@/data/orders";

interface OrderPriorityBadgeProps {
  priority: Order["priority"];
}

export function OrderPriorityBadge({ priority }: OrderPriorityBadgeProps) {
  return (
    <Badge variant="outline" className={getPriorityColor(priority)}>
      <span className="mr-1 h-2 w-2 rounded-full bg-current" />
      {priority}
    </Badge>
  );
}

