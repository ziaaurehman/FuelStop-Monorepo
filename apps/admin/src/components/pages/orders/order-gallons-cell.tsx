import { Droplet } from "lucide-react";

interface OrderGallonsCellProps {
  gallons: number;
}

export function OrderGallonsCell({ gallons }: OrderGallonsCellProps) {
  return (
    <div className="flex items-center">
      <Droplet className="mr-2 h-4 w-4 text-muted-foreground" />
      <span>{gallons} gal</span>
    </div>
  );
}
