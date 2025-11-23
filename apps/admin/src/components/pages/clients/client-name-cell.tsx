import { Avatar, AvatarImage, AvatarFallback } from "@repo/components";
import type { Client } from "@/data/clients";

interface ClientNameCellProps {
  client: Client;
}

export function ClientNameCell({ client }: ClientNameCellProps) {
  const initials = client.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <div className="flex items-center">
      <Avatar className="h-8 w-8 mr-2">
        <AvatarImage src={client.avatar} alt={client.name} />
        <AvatarFallback className="text-xs">{initials}</AvatarFallback>
      </Avatar>
      {client.name}
    </div>
  );
}
