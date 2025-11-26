import { Badge } from "../../ui/badge";
import { getPriorityColor } from "../../lib";

export interface OrderPriorityBadgeProps {
  priority: string;
}

export function OrderPriorityBadge({ priority }: OrderPriorityBadgeProps) {
  return (
    <Badge variant="outline" className={getPriorityColor(priority)}>
      <span className="mr-1 h-2 w-2 rounded-full bg-current" />
      {priority}
    </Badge>
  );
}

