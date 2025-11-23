import { MapPin } from "lucide-react";

interface OrderAddressCellProps {
  address: string;
  maxWidth?: number;
}

export function OrderAddressCell({
  address,
  maxWidth = 200,
}: OrderAddressCellProps) {
  return (
    <div className="flex items-center">
      <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
      <span className="truncate" style={{ maxWidth: `${maxWidth}px` }}>
        {address}
      </span>
    </div>
  );
}

