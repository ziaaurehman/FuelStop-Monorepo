import { Truck } from "lucide-react";

interface DriverVehicleCellProps {
  vehicle: string;
}

export function DriverVehicleCell({ vehicle }: DriverVehicleCellProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="bg-primary p-1 rounded-full">
        <Truck className="h-4 w-4 text-white" />
      </div>
      {vehicle}
    </div>
  );
}

