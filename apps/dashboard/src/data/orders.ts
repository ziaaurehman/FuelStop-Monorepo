export type Order = {
  id: string;
  client: string;
  address: string;
  gallons: number;
  status: "delivered" | "in transit" | "pending" | "scheduled";
  driver: {
    name: string;
    avatar?: string;
  };
  date: string;
  priority: "high" | "medium" | "low";
};

// Dummy data
export const orders: Order[] = [
  {
    id: "#ORD-98745",
    client: "Metro Gas Station",
    address: "123 Main St, Downtown",
    gallons: 500,
    status: "in transit",
    driver: { name: "Jacob Jones", avatar: "" },
    date: "2024-10-28T10:30:00",
    priority: "high",
  },
  {
    id: "#ORD-98746",
    client: "Metro Gas Station",
    address: "123 Main St, Downtown",
    gallons: 400,
    status: "delivered",
    driver: { name: "Albert Flores", avatar: "" },
    date: "2024-10-28T10:30:00",
    priority: "low",
  },
  {
    id: "#ORD-98747",
    client: "Metro Gas Station",
    address: "123 Main St, Downtown",
    gallons: 500,
    status: "delivered",
    driver: { name: "Theresa Webb", avatar: "" },
    date: "2024-10-28T10:30:00",
    priority: "low",
  },
  {
    id: "#ORD-98748",
    client: "Metro Gas Station",
    address: "123 Main St, Downtown",
    gallons: 500,
    status: "delivered",
    driver: { name: "Jenny Wilson", avatar: "" },
    date: "2024-10-28T10:30:00",
    priority: "low",
  },
  {
    id: "#ORD-98749",
    client: "Metro Gas Station",
    address: "123 Main St, Downtown",
    gallons: 500,
    status: "delivered",
    driver: { name: "Dianne Russell", avatar: "" },
    date: "2024-10-28T10:30:00",
    priority: "medium",
  },
  {
    id: "#ORD-98750",
    client: "Metro Gas Station",
    address: "123 Main St, Downtown",
    gallons: 200,
    status: "delivered",
    driver: { name: "Cody Fisher", avatar: "" },
    date: "2024-10-28T10:30:00",
    priority: "medium",
  },
  {
    id: "#ORD-98751",
    client: "Metro Gas Station",
    address: "123 Main St, Downtown",
    gallons: 500,
    status: "pending",
    driver: { name: "Jenny Wilson", avatar: "" },
    date: "2024-10-28T10:30:00",
    priority: "medium",
  },
  {
    id: "#ORD-98752",
    client: "Metro Gas Station",
    address: "123 Main St, Downtown",
    gallons: 300,
    status: "pending",
    driver: { name: "Floyd Miles", avatar: "" },
    date: "2024-10-28T10:30:00",
    priority: "high",
  },
  {
    id: "#ORD-98753",
    client: "Metro Gas Station",
    address: "123 Main St, Downtown",
    gallons: 500,
    status: "pending",
    driver: { name: "Devon Lane", avatar: "" },
    date: "2024-10-28T10:30:00",
    priority: "high",
  },
  {
    id: "#ORD-98754",
    client: "Metro Gas Station",
    address: "123 Main St, Downtown",
    gallons: 500,
    status: "scheduled",
    driver: { name: "Wade Warren", avatar: "" },
    date: "2024-10-28T10:30:00",
    priority: "high",
  },
  {
    id: "#ORD-98755",
    client: "Metro Gas Station",
    address: "123 Main St, Downtown",
    gallons: 500,
    status: "scheduled",
    driver: { name: "Bessie Cooper", avatar: "" },
    date: "2024-10-28T10:30:00",
    priority: "low",
  },
];
