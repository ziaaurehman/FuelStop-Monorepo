"use client";

import { Button, Input, Label } from "@repo/components";
import { LocationData } from "@/lib";
import { useState } from "react";
import { Plus, X } from "lucide-react";

interface LocationsStepProps {
  data: LocationData | null;
  onNext: (data: LocationData) => void;
  onBack: () => void;
}

export function LocationsStep({ data, onNext, onBack }: LocationsStepProps) {
  const [locations, setLocations] = useState(
    data?.locations || [
      { id: "1", name: "" },
      { id: "2", name: "" },
      { id: "3", name: "" },
    ]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({ locations: locations.filter((loc) => loc.name.trim() !== "") });
  };

  const addLocation = () => {
    setLocations([
      ...locations,
      { id: Date.now().toString(), name: "" },
    ]);
  };

  const removeLocation = (id: string) => {
    if (locations.length > 1) {
      setLocations(locations.filter((loc) => loc.id !== id));
    }
  };

  const updateLocation = (id: string, name: string) => {
    setLocations(
      locations.map((loc) => (loc.id === id ? { ...loc, name } : loc))
    );
  };

  return (
    <div className="mx-auto w-full max-w-2xl space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-semibold">Add Your Locations</h1>
        <p className="text-sm text-gray-500">
          Let{"'"}s set up your locations to get started.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              LOCATION
            </p>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={addLocation}
              className="text-primary hover:text-primary-foreground"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Location
            </Button>
          </div>

          {locations.map((location, index) => (
            <div key={location.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor={`location-${location.id}`}>
                  Location #{index + 1}
                </Label>
                {locations.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeLocation(location.id)}
                    className="h-6 w-6 p-0 text-gray-400 hover:text-red-600"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <Input
                id={`location-${location.id}`}
                placeholder={`Enter Location ${index+1}`}
                value={location.name}
                onChange={(e) => updateLocation(location.id, e.target.value)}
              />
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