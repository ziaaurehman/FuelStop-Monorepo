import { Badge, getStatusColor } from "@repo/components";

interface ClientStatusBadgeProps {
  status: string;
}

export function ClientStatusBadge({ status }: ClientStatusBadgeProps) {
  return (
    <Badge variant="secondary" className={getStatusColor(status)}>
      <span className="mr-1 h-2 w-2 rounded-full bg-current" />
      {status}
    </Badge>
  );
}
