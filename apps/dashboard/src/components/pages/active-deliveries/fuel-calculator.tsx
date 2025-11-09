"use client";

import { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Label,
  Slider,
} from "@repo/components";
import { Download } from "lucide-react";

export function FuelSavingsCalculator() {
  const [inputs, setInputs] = useState({
    fleetSize: 50,
    monthlyVolume: 100000,
    refuelsPerWeek: 2,
  });

  const [results, setResults] = useState({
    avgGallonsPerFillUp: 250.0,
    annualFuelConsumption: 1200000,
    timeSavings: 2400,
    laborSavings: 76800,
    avgAnnualSavings: 14136,
  });

  const calculateResults = (
    fleetSize: number,
    monthlyVolume: number,
    refuels: number
  ) => {
    // Mock calculation - replace with actual formulas
    setResults({
      avgGallonsPerFillUp: monthlyVolume / fleetSize / 4,
      annualFuelConsumption: monthlyVolume * 12,
      timeSavings: refuels * 52 * 8,
      laborSavings: refuels * 52 * 8 * 32,
      avgAnnualSavings: (monthlyVolume * 12 * 0.32) / fleetSize,
    });
  };

  const handleInputChange = (field: string, value: number[]) => {
    const newInputs = { ...inputs, [field]: value[0] };
    setInputs(newInputs);
    calculateResults(
      newInputs.fleetSize,
      newInputs.monthlyVolume,
      newInputs.refuelsPerWeek
    );
  };

  const handleExport = () => {
    console.log("Exporting fleet report...");
  };

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>Fuel Savings Calculator</CardTitle>
      </CardHeader>

      <CardContent className="flex-1 space-y-6">
        {/* Inputs */}
        <div className="space-y-4">
          {/* Fleet Size */}
          <div className="space-y-2">
            <Label htmlFor="fleetSize" className="text-sm font-medium">
              Fleet Size: {inputs.fleetSize} vehicles
            </Label>
            <Slider
              id="fleetSize"
              min={1}
              max={200}
              step={1}
              value={[inputs.fleetSize]}
              onValueChange={(val) => handleInputChange("fleetSize", val)}
              className="text-primary"
            />
          </div>

          {/* Monthly Fuel Volume */}
          <div className="space-y-2">
            <Label htmlFor="monthlyVolume" className="text-sm font-medium">
              Monthly Fuel Volume: {inputs.monthlyVolume.toLocaleString()}{" "}
              gallons
            </Label>
            <Slider
              id="monthlyVolume"
              min={1000}
              max={500000}
              step={1000}
              value={[inputs.monthlyVolume]}
              onValueChange={(val) => handleInputChange("monthlyVolume", val)}
              className="text-primary"
            />
          </div>

          {/* Refuels per Week */}
          <div className="space-y-2">
            <Label htmlFor="refuelsPerWeek" className="text-sm font-medium">
              Refuels per Week: {inputs.refuelsPerWeek}
            </Label>
            <Slider
              id="refuelsPerWeek"
              min={1}
              max={20}
              step={1}
              value={[inputs.refuelsPerWeek]}
              onValueChange={(val) => handleInputChange("refuelsPerWeek", val)}
              className="text-primary"
            />
          </div>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-2 gap-4 py-4 border-t">
          <div>
            <p className="text-sm text-muted-foreground mb-1">
              Avg. Gallons per Fill-Up
            </p>
            <p className="text-2xl font-bold">
              {results.avgGallonsPerFillUp.toFixed(1)}
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-1">
              Annual Fuel Consumption
            </p>
            <p className="text-2xl font-bold">
              {results.annualFuelConsumption.toLocaleString()}
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-1">
              Time Savings (hrs/year)
            </p>
            <p className="text-2xl font-bold text-green-600">
              {results.timeSavings.toLocaleString()}
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-1">Labor Savings</p>
            <p className="text-2xl font-bold text-green-600">
              ${results.laborSavings.toLocaleString()}
            </p>
          </div>

          <div className="col-span-2">
            <p className="text-sm text-muted-foreground mb-1">
              Avg. Annual Savings per Vehicle
            </p>
            <p className="text-3xl font-bold text-green-600">
              ${results.avgAnnualSavings.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Export Button */}
        <Button variant="outline" className="w-full" onClick={handleExport}>
          <Download className="mr-2 h-4 w-4" />
          Export Fleet Report
        </Button>
      </CardContent>
    </Card>
  );
}
