import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../ui/avatar";

export interface OrderDriver {
  name: string;
  avatar?: string | null;
}

export interface OrderDriverCellProps {
  driver: OrderDriver;
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("")
    .slice(0, 2);
}

export function OrderDriverCell({ driver }: OrderDriverCellProps) {
  const initials = getInitials(driver.name);

  return (
    <div className="flex items-center">
      <Avatar className="mr-2 h-8 w-8">
        <AvatarImage src={driver.avatar ?? undefined} alt={driver.name} />
        <AvatarFallback className="text-xs">
          {initials || "NA"}
        </AvatarFallback>
      </Avatar>
      <span>{driver.name}</span>
    </div>
  );
}

