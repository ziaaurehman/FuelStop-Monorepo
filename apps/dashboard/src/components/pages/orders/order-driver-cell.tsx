import { Avatar, AvatarFallback, AvatarImage } from "@repo/components";
import type { Order } from "@/data/orders";

interface OrderDriverCellProps {
  driver: Order["driver"];
}

export function OrderDriverCell({ driver }: OrderDriverCellProps) {
  const initials = driver.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <div className="flex items-center">
      <Avatar className="h-8 w-8 mr-2">
        <AvatarImage src={driver.avatar} alt={driver.name} />
        <AvatarFallback className="text-xs">{initials}</AvatarFallback>
      </Avatar>
      <span>{driver.name}</span>
    </div>
  );
}

