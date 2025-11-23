import { Badge, getStatusColor } from "@repo/components";

interface DriverStatusBadgeProps {
  status: string;
}

export function DriverStatusBadge({ status }: DriverStatusBadgeProps) {
  const formattedStatus =
    status === "on break"
      ? "On Break"
      : status.charAt(0).toUpperCase() + status.slice(1);

  return (
    <Badge variant="secondary" className={getStatusColor(status)}>
      <span className="mr-1 h-2 w-2 rounded-full bg-current" />
      {formattedStatus}
    </Badge>
  );
}

