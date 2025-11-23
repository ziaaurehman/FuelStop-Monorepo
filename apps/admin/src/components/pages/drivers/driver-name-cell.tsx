import { Avatar, AvatarImage, AvatarFallback } from "@repo/components";
import type { Driver } from "@/data/drivers";

interface DriverNameCellProps {
  driver: Driver;
}

export function DriverNameCell({ driver }: DriverNameCellProps) {
  const { name, avatar } = driver;
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <div className="flex items-center">
      <Avatar className="h-8 w-8 mr-2">
        <AvatarImage src={avatar} alt={name} />
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
      <span>{name}</span>
    </div>
  );
}

