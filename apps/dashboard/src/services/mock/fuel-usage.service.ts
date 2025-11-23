/**
 * Mock service for fuel usage data
 * Provides mock data for charts and metrics with simulated API delay
 */

export type TimeRange = "3" | "6" | "12";

/**
 * Fuel consumption chart data
 */
export interface FuelConsumptionData {
  month: string;
  predicted: number;
  actual: number;
}

/**
 * Total monthly cost chart data
 */
export interface TotalMonthlyCostData {
  month: string;
  fuelCost: number;
  labourCost: number;
  deliveryOverhead: number;
}

/**
 * Metrics data
 */
export interface MetricsData {
  averageGallonsPerFill: string;
  annualFuelConsumption: string;
  fuelTimeSavingsAnnually: string;
  labourSavingsAnnually: string;
  avgAnnualSavingsPerVehicle: string;
}

/**
 * Efficiency insight
 */
export interface EfficiencyInsight {
  title: string;
  description?: string;
}

/**
 * Fleet comparison data
 */
export interface FleetComparisonData {
  name: string;
  value: number;
  fill: string;
}

/**
 * Fuel usage data response
 */
export interface FuelUsageData {
  metrics: MetricsData;
  fuelConsumptionData: FuelConsumptionData[];
  totalMonthlyCostData: TotalMonthlyCostData[];
  efficiencyInsights: EfficiencyInsight[];
  fleetComparisonData: FleetComparisonData[];
}

/**
 * Simulate API delay
 */
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Generate fuel consumption data
 */
function generateFuelConsumptionData(timeRange: TimeRange): FuelConsumptionData[] {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const count = parseInt(timeRange);
  const startIndex = 12 - count;

  return months.slice(startIndex).map((month, index) => ({
    month,
    predicted: Math.floor(Math.random() * 30000) + 30000 + index * 2000,
    actual: Math.floor(Math.random() * 25000) + 30000 + index * 1500,
  }));
}

/**
 * Generate total monthly cost data
 */
function generateTotalMonthlyCostData(
  timeRange: TimeRange
): TotalMonthlyCostData[] {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const count = parseInt(timeRange);
  const startIndex = 12 - count;

  return months.slice(startIndex).map((month) => ({
    month,
    fuelCost: Math.floor(Math.random() * 20000) + 35000,
    labourCost: Math.floor(Math.random() * 10000) + 22000,
    deliveryOverhead: Math.floor(Math.random() * 5000) + 13000,
  }));
}

/**
 * Generate metrics data
 */
function generateMetricsData(timeRange: TimeRange): MetricsData {
  // Metrics can vary slightly based on timeRange
  const baseMultiplier = timeRange === "3" ? 0.25 : timeRange === "6" ? 0.5 : 1;

  return {
    averageGallonsPerFill: "486 gal",
    annualFuelConsumption: `${Math.floor(1200 * baseMultiplier)}k gal`,
    fuelTimeSavingsAnnually: `${Math.floor(2 * baseMultiplier)}k hrs`,
    labourSavingsAnnually: `$${Math.floor(77 * baseMultiplier)}k`,
    avgAnnualSavingsPerVehicle: "$14,893",
  };
}

/**
 * Generate efficiency insights
 */
function generateEfficiencyInsights(): EfficiencyInsight[] {
  return [
    {
      title: "Vehicle #102: 11% higher than fleet average",
    },
    {
      title: "Predictive refueling reduced 22 labor hours this week.",
    },
    {
      title:
        "Your retail division achieved 17% lower emissions vs. Q1 baseline.",
    },
  ];
}

/**
 * Generate fleet comparison data
 */
function generateFleetComparisonData(): FleetComparisonData[] {
  return [
    { name: "Petroleum Haulers", value: 32, fill: "hsl(var(--chart-1))" },
    { name: "Retail Fleets", value: 30, fill: "hsl(var(--chart-2))" },
    { name: "Municipal", value: 20, fill: "hsl(var(--chart-3))" },
    { name: "Construction", value: 18, fill: "hsl(var(--chart-4))" },
  ];
}

/**
 * Fetch fuel usage data with simulated API delay
 */
export async function getFuelUsageData(
  timeRange: TimeRange
): Promise<FuelUsageData> {
  // Simulate API delay (500-1000ms)
  const delayMs = Math.floor(Math.random() * 500) + 500;
  await delay(delayMs);

  return {
    metrics: generateMetricsData(timeRange),
    fuelConsumptionData: generateFuelConsumptionData(timeRange),
    totalMonthlyCostData: generateTotalMonthlyCostData(timeRange),
    efficiencyInsights: generateEfficiencyInsights(),
    fleetComparisonData: generateFleetComparisonData(),
  };
}

