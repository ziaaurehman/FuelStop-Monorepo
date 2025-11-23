/**
 * Mock service for dashboard data
 * Provides mock data for charts and orders with simulated API delay
 */

import { Order } from "@/data";

/**
 * Monthly fuel consumption chart data
 */
export interface MonthlyFuelData {
  month: string;
  gallons: number;
}

/**
 * Savings comparison chart data
 */
export interface SavingsComparisonData {
  month: string;
  fuelStopRate: number;
  marketRate: number;
}

/**
 * Dashboard data response
 */
export interface DashboardData {
  monthlyFuelData: MonthlyFuelData[];
  savingsComparisonData: SavingsComparisonData[];
  activeDeliveries: Order[];
}

/**
 * Simulate API delay
 */
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Generate monthly fuel consumption data
 */
function generateMonthlyFuelData(): MonthlyFuelData[] {
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

  return months.map((month) => ({
    month,
    gallons: Math.floor(Math.random() * 60000) + 30000, // 30k - 90k gallons
  }));
}

/**
 * Generate savings comparison data
 */
function generateSavingsComparisonData(): SavingsComparisonData[] {
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

  return months.map((month) => {
    const fuelStopRate = Math.floor(Math.random() * 30000) + 30000; // 30k - 60k
    const marketRate = fuelStopRate + Math.floor(Math.random() * 20000) + 15000; // Always higher
    return {
      month,
      fuelStopRate,
      marketRate,
    };
  });
}

/**
 * Generate active deliveries (recent orders)
 */
function generateActiveDeliveries(): Order[] {
  const drivers = [
    "Dianne Russell",
    "Savannah Nguyen",
    "Jacob Jones",
    "Albert Flores",
    "Esther Howard",
    "Theresa Webb",
    "Jenny Wilson",
    "Cody Fisher",
  ];

  const clients = [
    "Metro Gas Station",
    "City Fuel Hub",
    "Express Gas",
    "Quick Stop Fuel",
    "Highway Gas",
    "Premium Fuel Co",
    "Fast Track Gas",
    "Urban Fuel Station",
  ];

  const addresses = [
    "123 Main St, Downtown",
    "456 Oak Ave, Uptown",
    "789 Pine Rd, Suburbs",
    "321 Maple Dr, Downtown",
    "654 Elm St, Highway Exit",
    "987 Cedar Ln, Industrial",
    "147 Birch Way, Commercial",
    "258 Spruce Blvd, Retail",
  ];

  const statuses: Order["status"][] = ["in transit", "delivered"];
  const priorities: Order["priority"][] = ["high", "medium", "low"];

  return Array.from({ length: 5 }, (_, i) => {
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const priority = priorities[Math.floor(Math.random() * priorities.length)];
    const driverIndex = Math.floor(Math.random() * drivers.length);
    const clientIndex = Math.floor(Math.random() * clients.length);
    const addressIndex = Math.floor(Math.random() * addresses.length);

    const now = new Date();
    const hoursAgo = Math.floor(Math.random() * 5) + 1;
    const date = new Date(now.getTime() - hoursAgo * 60 * 60 * 1000);

    return {
      id: `#ORD-${98745 + i}`,
      client: clients[clientIndex],
      address: addresses[addressIndex],
      gallons: [200, 300, 400, 500][Math.floor(Math.random() * 4)],
      status,
      driver: {
        name: drivers[driverIndex],
        avatar: "",
      },
      date: date.toISOString(),
      priority,
    };
  });
}

/**
 * Fetch dashboard data with simulated API delay
 */
export async function getDashboardData(): Promise<DashboardData> {
  // Simulate API delay (500-1000ms)
  const delayMs = Math.floor(Math.random() * 500) + 500;
  await delay(delayMs);

  return {
    monthlyFuelData: generateMonthlyFuelData(),
    savingsComparisonData: generateSavingsComparisonData(),
    activeDeliveries: generateActiveDeliveries(),
  };
}
