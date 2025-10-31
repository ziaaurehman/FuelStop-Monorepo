"use client";

import {
  Button,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/components";

import { VehicleDetailsData } from "@/lib";
import { useState } from "react";
import { Plus, X } from "lucide-react";

interface VehicleDetailsStepProps {
  data: VehicleDetailsData | null;
  locations: string[];
  onNext: (data: VehicleDetailsData) => void;
  onBack: () => void;
}

export function VehicleDetailsStep({
  data,
  locations,
  onNext,
  onBack,
}: VehicleDetailsStepProps) {
  const [formData, setFormData] = useState<VehicleDetailsData>(
    data || {
      fleetSize: "",
      existingSystem: "",
      vehicles: [
        {
          id: "1",
          vehicleId: "",
          fuelType: "",
          tankSize: "",
          parkedLocation: "",
        },
      ],
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext(formData);
  };

  const addVehicle = () => {
    setFormData({
      ...formData,
      vehicles: [
        ...formData.vehicles,
        {
          id: Date.now().toString(),
          vehicleId: "",
          fuelType: "",
          tankSize: "",
          parkedLocation: "",
        },
      ],
    });
  };

  const removeVehicle = (id: string) => {
    if (formData.vehicles.length > 1) {
      setFormData({
        ...formData,
        vehicles: formData.vehicles.filter((v) => v.id !== id),
      });
    }
  };

  const updateVehicle = (
    id: string,
    field: keyof VehicleDetailsData["vehicles"][0],
    value: string
  ) => {
    setFormData({
      ...formData,
      vehicles: formData.vehicles.map((v) =>
        v.id === id ? { ...v, [field]: value } : v
      ),
    });
  };

  return (
    <div className="mx-auto w-full max-w-2xl space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-semibold">Fleet and Vehicle Details</h1>
        <p className="text-sm text-gray-500">
          Operational intergration for your fleet
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            VEHICLE INFORMATION
          </p>

          <div className="space-y-2">
            <Label htmlFor="fleetSize">
              Fleet Size <span className="text-red-500">*</span>
            </Label>
            <Input
              id="fleetSize"
              placeholder="eg. 25"
              value={formData.fleetSize}
              onChange={(e) =>
                setFormData({ ...formData, fleetSize: e.target.value })
              }
              required
            />
            <p className="text-xs text-gray-500">(Number of vehicle/Trucks)</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="existingSystem">Existing system (Optional)</Label>
            <Input
              id="existingSystem"
              placeholder="eg. 25"
              value={formData.existingSystem}
              onChange={(e) =>
                setFormData({ ...formData, existingSystem: e.target.value })
              }
            />
            <p className="text-xs text-gray-500">
              Please list any existing systems you use for the fleet management
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              VEHICLE INFORMATION
            </p>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={addVehicle}
              className="text-primary hover:text-primary-foreground "
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Vehicle
            </Button>
          </div>

          {formData.vehicles.map((vehicle, index) => (
            <div
              key={vehicle.id}
              className="space-y-4 rounded-lg border p-4 relative"
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-semibold text-gray-500 uppercase">
                  VEHICLE #{index + 1}
                </p>
                {formData.vehicles.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeVehicle(vehicle.id)}
                    className="h-6 w-6 p-0 text-gray-400 hover:text-red-600"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`vehicleId-${vehicle.id}`}>
                    Vehicle ID/ Number
                  </Label>
                  <Input
                    id={`vehicleId-${vehicle.id}`}
                    placeholder="hello@fuelstop.com"
                    value={vehicle.vehicleId}
                    onChange={(e) =>
                      updateVehicle(vehicle.id, "vehicleId", e.target.value)
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`fuelType-${vehicle.id}`}>Fuel Type</Label>
                  <Select
                    value={vehicle.fuelType}
                    onValueChange={(value: string) =>
                      updateVehicle(vehicle.id, "fuelType", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select fuel type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="diesel">Diesel</SelectItem>
                      <SelectItem value="gasoline">Gasoline</SelectItem>
                      <SelectItem value="electric">Electric</SelectItem>
                      <SelectItem value="hybrid">Hybrid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`tankSize-${vehicle.id}`}>Tank Size</Label>
                  <Input
                    id={`tankSize-${vehicle.id}`}
                    placeholder="eg. 50 gallons"
                    value={vehicle.tankSize}
                    onChange={(e) =>
                      updateVehicle(vehicle.id, "tankSize", e.target.value)
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`parkedLocation-${vehicle.id}`}>
                    Parked Location
                  </Label>
                  <Select
                    value={vehicle.parkedLocation}
                    onValueChange={(value: string) =>
                      updateVehicle(vehicle.id, "parkedLocation", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map((location) => (
                        <SelectItem key={location} value={location}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            className="flex-1"
          >
            Back
          </Button>
          <Button
            type="submit"
            className="flex-1 bg-primary hover:bg-primary-foreground text-white"
          >
            Continue
          </Button>
        </div>
      </form>
    </div>
  );
}
