/**
 * Mock service for delivery tracking data
 * Provides mock data for deliveries and stats with simulated API delay
 */

export type DeliveryStatus = "completed" | "in-transit" | "pending";

/**
 * Delivery data
 */
export interface Delivery {
  id: string;
  driver: {
    name: string;
    avatar?: string;
  };
  destination: string;
  quantity: string;
  fuelType: string;
  eta: string;
  distance: string;
  status: DeliveryStatus;
}

/**
 * Delivery stat
 */
export interface DeliveryStat {
  label: string;
  value: string;
  bgColor: string;
  textColor: string;
}

/**
 * Delivery tracking data response
 */
export interface DeliveryTrackingData {
  deliveries: Delivery[];
  stats: DeliveryStat[];
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
  "Mike Johnson",
  "Sarah Williams",
  "David Brown",
  "Emily Davis",
  "James Wilson",
  "Lisa Anderson",
  "Robert Taylor",
  "Jennifer Martinez",
  "Michael Thomas",
  "Amanda Jackson",
];

/**
 * Generate mock destinations
 */
const destinations = [
  "34355 Industrial Avenue",
  "789 Main Street",
  "456 Commerce Boulevard",
  "123 Factory Road",
  "890 Warehouse Drive",
  "567 Distribution Center",
  "234 Logistics Lane",
  "678 Supply Chain Way",
  "345 Manufacturing Street",
  "901 Transport Avenue",
];

/**
 * Generate mock fuel types
 */
const fuelTypes = ["Petrol", "Diesel", "Gasoline", "Ethanol"];

/**
 * Generate mock deliveries
 */
function generateDeliveries(count: number = 50): Delivery[] {
  const statuses: DeliveryStatus[] = ["completed", "in-transit", "pending"];
  const deliveries: Delivery[] = [];

  for (let i = 0; i < count; i++) {
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const driverName = driverNames[Math.floor(Math.random() * driverNames.length)];
    const destination = destinations[Math.floor(Math.random() * destinations.length)];
    const fuelType = fuelTypes[Math.floor(Math.random() * fuelTypes.length)];
    const quantity = `${Math.floor(Math.random() * 1000) + 500} Gallons`;
    const hours = Math.floor(Math.random() * 12) + 1;
    const minutes = Math.floor(Math.random() * 60);
    const ampm = hours >= 12 ? "pm" : "am";
    const displayHours = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
    const eta = `${displayHours}:${minutes.toString().padStart(2, "0")}${ampm}`;
    const distance = `${(Math.random() * 10 + 0.5).toFixed(1)} Kilometer`;

    deliveries.push({
      id: `ORD-${String(Math.floor(Math.random() * 100000)).padStart(5, "0")}`,
      driver: {
        name: driverName,
        avatar: `/avatars/${driverName.toLowerCase().replace(/\s+/g, "-")}.jpg`,
      },
      destination,
      quantity,
      fuelType,
      eta,
      distance,
      status,
    });
  }

  return deliveries;
}

/**
 * Generate delivery stats
 */
function generateStats(deliveries: Delivery[]): DeliveryStat[] {
  const inTransit = deliveries.filter((d) => d.status === "in-transit").length;
  const nearby = deliveries.filter(
    (d) => d.status === "in-transit" && parseFloat(d.distance) < 2
  ).length;
  const delivered = deliveries.filter((d) => d.status === "completed").length;

  return [
    {
      label: "In Transit",
      value: inTransit.toLocaleString(),
      bgColor: "bg-blue-100",
      textColor: "text-blue-900",
    },
    {
      label: "Nearby",
      value: `${nearby * 162} gal`, // Approximate calculation
      bgColor: "bg-yellow-100",
      textColor: "text-amber-900",
    },
    {
      label: "Delivered",
      value: `$${(delivered * 2242).toLocaleString()}`, // Approximate calculation
      bgColor: "bg-green-100",
      textColor: "text-green-900",
    },
  ];
}

/**
 * Filter deliveries by status and search query
 */
function filterDeliveries(
  deliveries: Delivery[],
  statusFilter: "all" | DeliveryStatus,
  searchQuery: string
): Delivery[] {
  let filtered = deliveries;

  // Filter by status
  if (statusFilter !== "all") {
    filtered = filtered.filter((delivery) => delivery.status === statusFilter);
  }

  // Filter by search query
  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase();
    filtered = filtered.filter(
      (delivery) =>
        delivery.id.toLowerCase().includes(query) ||
        delivery.driver.name.toLowerCase().includes(query) ||
        delivery.destination.toLowerCase().includes(query) ||
        delivery.fuelType.toLowerCase().includes(query)
    );
  }

  return filtered;
}

/**
 * Fetch delivery tracking data with simulated API delay
 */
export async function getDeliveryTrackingData(
  statusFilter: "all" | DeliveryStatus = "all",
  searchQuery: string = ""
): Promise<DeliveryTrackingData> {
  // Simulate API delay (500-1000ms)
  const delayMs = Math.floor(Math.random() * 500) + 500;
  await delay(delayMs);

  // Generate mock deliveries
  const allDeliveries = generateDeliveries(50);

  // Filter deliveries
  const filteredDeliveries = filterDeliveries(allDeliveries, statusFilter, searchQuery);

  // Generate stats from all deliveries (not filtered)
  const stats = generateStats(allDeliveries);

  return {
    deliveries: filteredDeliveries,
    stats,
  };
}

