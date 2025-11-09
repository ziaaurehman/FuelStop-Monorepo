"use client";

import { useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
  Input,
  RadioGroup,
  RadioGroupItem,
  Button,
  Label,
} from "@repo/components";

export function NewOrderForm() {
  const [fuelType, setFuelType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [location, setLocation] = useState("");
  const [driver, setDriver] = useState("");
  const [deliveryOption, setDeliveryOption] = useState("standard");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      fuelType,
      quantity,
      location,
      driver,
      deliveryOption,
    });
  };

  return (
    <div className="max-w-md w-full bg-white rounded-xl shadow-lg py-2 relative">
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Fuel Type */}
        <div>
          <Label className="mb-1 block">Fuel Type</Label>
          <Select onValueChange={setFuelType}>
            <SelectTrigger>
              <SelectValue placeholder="Select fuel type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="regular">
                Regular Gasoline - $3.45/gal
              </SelectItem>
              <SelectItem value="premium">
                Premium Gasoline - $3.95/gal
              </SelectItem>
              <SelectItem value="diesel">Diesel - $4.10/gal</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Quantity */}
        <div>
          <Label className="mb-1 block">
            Quantity <span className="text-gray-500">(gal)</span>
          </Label>
          <Input
            type="number"
            placeholder="Enter Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>

        {/* Delivery Location */}
        <div>
          <Label className="mb-1 block">Delivery Location</Label>
          <Select onValueChange={setLocation}>
            <SelectTrigger>
              <SelectValue placeholder="Select Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="warehouse">Warehouse</SelectItem>
              <SelectItem value="stationA">Station A</SelectItem>
              <SelectItem value="stationB">Station B</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Driver */}
        <div>
          <Label className="mb-1 block">Driver</Label>
          <Select onValueChange={setDriver}>
            <SelectTrigger>
              <SelectValue placeholder="Select driver" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="john">John Doe</SelectItem>
              <SelectItem value="jane">Jane Smith</SelectItem>
              <SelectItem value="alex">Alex Johnson</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Delivery Option */}
        <div>
          <Label className="mb-2 block">Delivery Option</Label>
          <RadioGroup
            value={deliveryOption}
            onValueChange={setDeliveryOption}
            className="space-y-2"
          >
            <Label className="flex items-start gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
              <RadioGroupItem value="standard" />
              <div>
                <p className="font-medium">Standard</p>
                <p className="text-sm text-muted-foreground">
                  3–5 Business days
                </p>
              </div>
            </Label>

            <Label className="flex items-start gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
              <RadioGroupItem value="priority" />
              <div>
                <p className="font-medium">Priority</p>
                <p className="text-sm text-muted-foreground">
                  1–2 Business days (+$50)
                </p>
              </div>
            </Label>

            <Label className="flex items-start gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
              <RadioGroupItem value="emergency" />
              <div>
                <p className="font-medium">Emergency</p>
                <p className="text-sm text-muted-foreground">
                  Same day (+$150)
                </p>
              </div>
            </Label>
          </RadioGroup>
        </div>

        {/* Submit */}
        <Button type="submit" className="w-full mt-4">
          Place Order
        </Button>
      </form>
    </div>
  );
}
