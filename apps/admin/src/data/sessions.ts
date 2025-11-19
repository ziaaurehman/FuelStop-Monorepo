// Member type
export type Session = {
  Browser: string;
  location: string;
  IP?: string;
  mostRecentActivity: string;
};

// Dummy members data
export const sessions: Session[] = [
  {
    Browser: "Mozilla FireFox",
    location: "Lahore, Pakistan",
    IP: "224.0.2.2",
    mostRecentActivity: "Current Session",
  },
  {
    Browser: "Google Chrome",
    location: "Lahore, Pakistan",
    IP: "34.2.4.2",
    mostRecentActivity: "Yesterday, 8:21 AM",
  },
  {
    Browser: "Mozilla FireFox",
    location: "Lahore, Pakistan",
    IP: "14.2.0.1",
    mostRecentActivity: "Today, 3:24 PM",
  },
  {
    Browser: "Google Chrome",
    location: "Lahore, Pakistan",
    IP: "129.3.2.4",
    mostRecentActivity: "Sep 24, 2023 at 2:10 PM",
  },
  {
    Browser: "Safari",
    location: "Lahore, Pakistan",
    IP: "10.4.32.45",
    mostRecentActivity: "Sep 23, 2023 at 1:30 PM",
  },
];
