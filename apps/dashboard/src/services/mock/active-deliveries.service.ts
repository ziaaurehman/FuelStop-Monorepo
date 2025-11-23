/**
 * Mock service for active deliveries data
 * Provides mock data for deliveries, stats, and insights with simulated API delay
 */

export type DeliveryStatus = "In transit" | "Scheduled" | "Pending";
export type FuelType = "Diesel" | "Gasoline";
export type Region = "downtown" | "uptown";

/**
 * Delivery data
 */
export interface Delivery {
  id: string;
  companyName: string;
  location: string;
  region: Region;
  gallons: number;
  fuelType: FuelType;
  time: string;
  status: DeliveryStatus;
  progress: number;
  driver: {
    name: string;
    avatar?: string;
  };
}

/**
 * Stat data
 */
export interface Stat {
  icon: string;
  label: string;
  value: string;
  badge: {
    text: string;
    variant: "success" | "destructive";
  };
  tooltip: string;
}

/**
 * Predictive insight
 */
export interface PredictiveInsight {
  message: string;
  action: string;
  actionLink: string;
}

/**
 * Active deliveries data response
 */
export interface ActiveDeliveriesData {
  deliveries: Delivery[];
  stats: Stat[];
  insights: PredictiveInsight[];
}

/**
 * Simulate API delay
 */
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Generate mock driver names
 */
const driverNames = [
  "Dianne Russell",
  "John Smith",
  "Sarah Johnson",
  "Mike Johnson",
  "Emily Davis",
  "David Brown",
  "Lisa Anderson",
  "James Wilson",
];

/**
 * Generate mock company names
 */
const companyNames = [
  "Company Name",
  "Tech Solutions",
  "Construction Co",
  "Industrial Corp",
  "Logistics Inc",
  "Transport Services",
  "Fleet Management",
  "Supply Chain Co",
];

/**
 * Generate mock locations
 */
const locations = [
  "Downtown Site A",
  "Uptown Site B",
  "West Zone C",
  "East District D",
  "North Quarter E",
  "South Plaza F",
  "Central Hub G",
  "Industrial Park H",
];

/**
 * Generate mock deliveries
 */
function generateDeliveries(count: number = 50): Delivery[] {
  const statuses: DeliveryStatus[] = ["In transit", "Scheduled", "Pending"];
  const fuelTypes: FuelType[] = ["Diesel", "Gasoline"];
  const regions: Region[] = ["downtown", "uptown"];
  const deliveries: Delivery[] = [];

  for (let i = 0; i < count; i++) {
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const fuelType = fuelTypes[Math.floor(Math.random() * fuelTypes.length)];
    const region = regions[Math.floor(Math.random() * regions.length)];
    const driverName = driverNames[Math.floor(Math.random() * driverNames.length)];
    const companyName = companyNames[Math.floor(Math.random() * companyNames.length)];
    const location = locations[Math.floor(Math.random() * locations.length)];
    const gallons = Math.floor(Math.random() * 1000) + 200;
    const progress = status === "In transit" ? Math.floor(Math.random() * 100) : 0;
    const hour = Math.floor(Math.random() * 12) + 8;
    const time = `${hour} AM - ${hour + 1} AM`;

    deliveries.push({
      id: `DEL-${String(i + 1).padStart(3, "0")}`,
      companyName,
      location,
      region,
      gallons,
      fuelType,
      time,
      status,
      progress,
      driver: {
        name: driverName,
        avatar: `/avatars/${driverName.toLowerCase().replace(/\s+/g, "-")}.jpg`,
      },
    });
  }

  return deliveries;
}

/**
 * Generate stats
 */
function generateStats(): Stat[] {
  return [
    {
      icon: "Droplet",
      label: "Monthly Fuel Consumption",
      value: "486 gal",
      badge: {
        text: "5% Efficiency Gain",
        variant: "success",
      },
      tooltip: "Real-time data from LCRI.Q® device integrations",
    },
    {
      icon: "DollarSign",
      label: "Estimated Savings",
      value: "$0.32",
      badge: {
        text: "8% above target",
        variant: "success",
      },
      tooltip: "per gallon vs. market rates",
    },
    {
      icon: "Leaf",
      label: "CO₂ Reduction",
      value: "2.1 tons",
      badge: {
        text: "18% lower idle time",
        variant: "destructive",
      },
      tooltip: "Equivalent to planting 32 trees",
    },
  ];
}

/**
 * Generate predictive insights
 */
function generateInsights(): PredictiveInsight[] {
  return [
    {
      message: "Your construction fleet will require refueling in 2.4 days.",
      action: "Schedule Now",
      actionLink: "#",
    },
    {
      message: "3 trucks exceeded ideal idle thresholds this week.",
      action: "View Details",
      actionLink: "#",
    },
    {
      message: "Reordering now saves ~12 refueling hours this week.",
      action: "Optimize Schedule",
      actionLink: "#",
    },
    {
      message: "Your construction fleet will require refueling in 2.4 days.",
      action: "View Route",
      actionLink: "#",
    },
    {
      message: "Your construction fleet will require refueling in 2.4 days.",
      action: "View Route",
      actionLink: "#",
    },
  ];
}

/**
 * Filter deliveries by filters and search query
 */
function filterDeliveries(
  deliveries: Delivery[],
  regionFilter: "all" | Region,
  driverFilter: "all" | string,
  fuelTypeFilter: "all" | FuelType,
  dateFilter: "all" | "today" | "week",
  searchQuery: string
): Delivery[] {
  let filtered = deliveries;

  // Filter by region
  if (regionFilter !== "all") {
    filtered = filtered.filter((delivery) => delivery.region === regionFilter);
  }

  // Filter by driver
  if (driverFilter !== "all") {
    filtered = filtered.filter((delivery) => delivery.driver.name === driverFilter);
  }

  // Filter by fuel type
  if (fuelTypeFilter !== "all") {
    filtered = filtered.filter((delivery) => delivery.fuelType === fuelTypeFilter);
  }

  // Filter by date (simplified - in real app, would filter by actual dates)
  // For now, we'll just return all if date filter is not "all"
  // In a real implementation, you'd filter by actual delivery dates

  // Filter by search query
  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase();
    filtered = filtered.filter(
      (delivery) =>
        delivery.id.toLowerCase().includes(query) ||
        delivery.companyName.toLowerCase().includes(query) ||
        delivery.location.toLowerCase().includes(query) ||
        delivery.driver.name.toLowerCase().includes(query)
    );
  }

  return filtered;
}

/**
 * Fetch active deliveries data with simulated API delay
 */
export async function getActiveDeliveriesData(
  regionFilter: "all" | Region = "all",
  driverFilter: "all" | string = "all",
  fuelTypeFilter: "all" | FuelType = "all",
  dateFilter: "all" | "today" | "week" = "all",
  searchQuery: string = ""
): Promise<ActiveDeliveriesData> {
  // Simulate API delay (500-1000ms)
  const delayMs = Math.floor(Math.random() * 500) + 500;
  await delay(delayMs);

  // Generate mock deliveries
  const allDeliveries = generateDeliveries(50);

  // Filter deliveries
  const filteredDeliveries = filterDeliveries(
    allDeliveries,
    regionFilter,
    driverFilter,
    fuelTypeFilter,
    dateFilter,
    searchQuery
  );

  // Generate stats and insights
  const stats = generateStats();
  const insights = generateInsights();

  return {
    deliveries: filteredDeliveries,
    stats,
    insights,
  };
}

