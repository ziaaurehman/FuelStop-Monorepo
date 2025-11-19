// Schedule delivery type
export type ScheduleDelivery = {
  id: string;
  orderId: string;
  companyName: string;
  gallons: number;
  fuelType: "Diesel" | "Petrol" | "Gasoline";
  time?: string;
  completedAt?: string;
  location: string;
  priority: "high" | "medium" | "low";
  driver?: {
    name: string;
    avatar?: string;
  };
};

// Schedule data organized by status
export const scheduleData: Record<string, ScheduleDelivery[]> = {
  scheduled: [
    {
      id: "SCH-001",
      orderId: "#ORD-98745",
      companyName: "Company Name",
      gallons: 500,
      fuelType: "Diesel",
      time: "10 AM - 11 AM",
      location: "Downtown Street",
      priority: "high",
    },
    {
      id: "SCH-002",
      orderId: "#ORD-98745",
      companyName: "Company Name",
      gallons: 500,
      fuelType: "Diesel",
      time: "10 AM - 11 AM",
      location: "Downtown Street",
      priority: "high",
    },
  ],
  assigned: [
    {
      id: "ASN-001",
      orderId: "#ORD-98745",
      companyName: "Company Name",
      gallons: 500,
      fuelType: "Diesel",
      time: "10 AM - 11 AM",
      location: "Downtown Street",
      priority: "high",
      driver: {
        name: "Dianne Russell",
        avatar: "",
      },
    },
    {
      id: "ASN-002",
      orderId: "#ORD-98745",
      companyName: "Company Name",
      gallons: 500,
      fuelType: "Diesel",
      time: "10 AM - 11 AM",
      location: "Downtown Street",
      priority: "high",
      driver: {
        name: "Dianne Russell",
        avatar: "",
      },
    },
    {
      id: "ASN-003",
      orderId: "#ORD-98745",
      companyName: "Company Name",
      gallons: 500,
      fuelType: "Diesel",
      time: "10 AM - 11 AM",
      location: "Downtown Street",
      priority: "high",
      driver: {
        name: "Dianne Russell",
        avatar: "",
      },
    },
    {
      id: "ASN-004",
      orderId: "#ORD-98745",
      companyName: "Company Name",
      gallons: 500,
      fuelType: "Diesel",
      time: "10 AM - 11 AM",
      location: "Downtown Street",
      priority: "high",
      driver: {
        name: "Dianne Russell",
        avatar: "",
      },
    },
  ],
  "in-progress": [
    {
      id: "PRG-001",
      orderId: "#ORD-98745",
      companyName: "Company Name",
      gallons: 500,
      fuelType: "Diesel",
      time: "10 AM - 11 AM",
      location: "Downtown Street",
      priority: "high",
      driver: {
        name: "Dianne Russell",
        avatar: "",
      },
    },
    {
      id: "PRG-002",
      orderId: "#ORD-98745",
      companyName: "Company Name",
      gallons: 500,
      fuelType: "Diesel",
      time: "10 AM - 11 AM",
      location: "Downtown Street",
      priority: "high",
      driver: {
        name: "Dianne Russell",
        avatar: "",
      },
    },
  ],
  completed: [
    {
      id: "CMP-001",
      orderId: "#ORD-98745",
      companyName: "Company Name",
      gallons: 500,
      fuelType: "Diesel",
      completedAt: "12:00 AM",
      location: "Downtown Street",
      priority: "high",
      driver: {
        name: "Dianne Russell",
        avatar: "",
      },
    },
    {
      id: "CMP-002",
      orderId: "#ORD-98745",
      companyName: "Company Name",
      gallons: 500,
      fuelType: "Diesel",
      completedAt: "12:00 AM",
      location: "Downtown Street",
      priority: "high",
      driver: {
        name: "Dianne Russell",
        avatar: "",
      },
    },
  ],
  blocked: [
    {
      id: "BLK-001",
      orderId: "#ORD-98745",
      companyName: "Company Name",
      gallons: 500,
      fuelType: "Diesel",
      time: "10 AM - 11 AM",
      location: "Downtown Street",
      priority: "high",
      driver: {
        name: "Dianne Russell",
        avatar: "",
      },
    },
  ],
};
