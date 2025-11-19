// Member type
export type Member = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  lastActivity: string;
  role: "owner" | "admin" | "member";
};

// Dummy members data
export const members: Member[] = [
  {
    id: "1",
    name: "Arthur Taylor",
    email: "arthur@fuelstop.com",
    avatar: "",
    lastActivity: "Today, 3:52 PM",
    role: "owner",
  },
  {
    id: "2",
    name: "Sophia Williams",
    email: "sophia@fuelstop.com",
    avatar: "",
    lastActivity: "Yesterday, 8:21 AM",
    role: "admin",
  },
  {
    id: "3",
    name: "Matthew Johnson",
    email: "matthew@fuelstop.com",
    avatar: "",
    lastActivity: "Today, 3:24 PM",
    role: "admin",
  },
  {
    id: "4",
    name: "James Brown",
    email: "james@fuelstop.com",
    avatar: "",
    lastActivity: "Sep 24, 2023 at 2:10 PM",
    role: "member",
  },
  {
    id: "5",
    name: "Wei Chen",
    email: "wei@fuelstop.com",
    avatar: "",
    lastActivity: "Sep 23, 2023 at 1:30 PM",
    role: "member",
  },
];
