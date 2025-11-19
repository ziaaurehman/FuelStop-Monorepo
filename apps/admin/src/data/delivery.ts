// Delivery type
export type Delivery = {
  id: string;
  companyName: string;
  location: string;
  region: string;
  gallons: number;
  fuelType: "Diesel" | "Gasoline";
  time: string;
  status: "In transit" | "Scheduled" | "Pending";
  progress: number;
  driver: {
    name: string;
    avatar?: string;
  };
};

// Dummy deliveries data
export const deliveries: Delivery[] = [
  {
    id: "DEL-001",
    companyName: "Company Name",
    location: "Downtown Site A",
    region: "downtown",
    gallons: 500,
    fuelType: "Diesel",
    time: "10 AM - 11 AM",
    status: "In transit",
    progress: 30,
    driver: {
      name: "Dianne Russell",
      avatar: "",
    },
  },
  {
    id: "DEL-002",
    companyName: "Company Name",
    location: "Downtown Site A",
    region: "downtown",
    gallons: 500,
    fuelType: "Diesel",
    time: "10 AM - 11 AM",
    status: "In transit",
    progress: 30,
    driver: {
      name: "Dianne Russell",
      avatar: "",
    },
  },
  {
    id: "DEL-003",
    companyName: "Company Name",
    location: "Downtown Site A",
    region: "downtown",
    gallons: 500,
    fuelType: "Diesel",
    time: "10 AM - 11 AM",
    status: "In transit",
    progress: 30,
    driver: {
      name: "Dianne Russell",
      avatar: "",
    },
  },
  {
    id: "DEL-004",
    companyName: "Company Name",
    location: "Downtown Site A",
    region: "downtown",
    gallons: 500,
    fuelType: "Diesel",
    time: "10 AM - 11 AM",
    status: "In transit",
    progress: 30,
    driver: {
      name: "Dianne Russell",
      avatar: "",
    },
  },
  {
    id: "DEL-005",
    companyName: "Tech Solutions",
    location: "Uptown Site B",
    region: "uptown",
    gallons: 750,
    fuelType: "Gasoline",
    time: "2 PM - 3 PM",
    status: "Scheduled",
    progress: 0,
    driver: {
      name: "John Smith",
      avatar: "",
    },
  },
  {
    id: "DEL-006",
    companyName: "Construction Co",
    location: "West Zone C",
    region: "downtown",
    gallons: 1000,
    fuelType: "Diesel",
    time: "9 AM - 10 AM",
    status: "In transit",
    progress: 65,
    driver: {
      name: "Sarah Johnson",
      avatar: "",
    },
  },
];
