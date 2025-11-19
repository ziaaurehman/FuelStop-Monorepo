export type NotificationType = "chat" | "ticket" | "alert" | "system";

export interface User {
  id: string;
  name: string;
  avatar?: string;
  email?: string;
  lastOnline?: string;
}

export interface ChatMessage {
  id: string;
  content: string;
  timestamp: string;
  sender: User;
  isOwn?: boolean;
}

export interface ChatNotification {
  id: string;
  type: "chat";
  user: User;
  lastMessage: string;
  timestamp: string;
  unread?: boolean;
  messages?: ChatMessage[];
}

export interface TicketNotification {
  id: string;
  type: "ticket";
  ticketId: string;
  title: string;
  description: string;
  company: string;
  timestamp: string;
  assignedTo?: User;
  lastUpdate?: string;
  priority: "high" | "medium" | "low";
  status: "in progress" | "pending" | "resolved";
  messages?: ChatMessage[];
}

export interface AlertNotification {
  id: string;
  type: "alert";
  title: string;
  description: string;
  timestamp: string;
  icon: string;
  severity: "critical" | "warning" | "info";
  metadata?: string;
}

export interface SystemNotification {
  id: string;
  type: "system";
  title: string;
  description: string;
  timestamp: string;
  severity: "critical" | "warning" | "info";
  status: "active" | "resolved";
}

export type Notification =
  | ChatNotification
  | TicketNotification
  | AlertNotification
  | SystemNotification;


export const dummyUsers = [
  {
    id: "1",
    name: "Cameron Williamson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Cameron",
    lastOnline: "Active now",
  },
  {
    id: "2",
    name: "Darlene Robertson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Darlene",
    lastOnline: "2 minutes ago",
  },
  {
    id: "3",
    name: "Courtney Henry",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Courtney",
    lastOnline: "5 minutes ago",
  },
  {
    id: "4",
    name: "Ronald Richards",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ronald",
    lastOnline: "10 minutes ago",
  },
  {
    id: "5",
    name: "Theresa Webb",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Theresa",
    lastOnline: "15 minutes ago",
  },
  {
    id: "6",
    name: "Royal Parvej",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Royal",
    lastOnline: "Active now",
  },
];

export const dummyNotifications: Notification[] = [
  // Chat notifications
  {
    id: "chat-1",
    type: "chat",
    user: dummyUsers[0],
    lastMessage: "Primary database connection has been lost. Switching to backup server.",
    timestamp: "2024-11-14T11:30:00",
    unread: true,
    messages: [
      {
        id: "msg-1",
        content: "Primary database connection has been lost. Switching to backup server.",
        timestamp: "2024-11-14T11:30:00",
        sender: dummyUsers[0],
      },
      {
        id: "msg-2",
        content: "Thanks for letting me know. I'll check on it right away.",
        timestamp: "2024-11-14T11:32:00",
        sender: { id: "me", name: "You", avatar: "" },
        isOwn: true,
      },
    ],
  },
  {
    id: "chat-2",
    type: "chat",
    user: dummyUsers[1],
    lastMessage: "Our AI is still learning and may be inaccurate. Please verify using links below.",
    timestamp: "2024-11-14T07:29:00",
    messages: [
      {
        id: "msg-3",
        content: "Our AI is still learning and may be inaccurate. Please verify using links below.",
        timestamp: "2024-11-14T07:29:00",
        sender: dummyUsers[1],
      },
      {
        id: "msg-4",
        content: "linkhere.com",
        timestamp: "2024-11-14T07:29:10",
        sender: dummyUsers[1],
      },
      {
        id: "msg-5",
        content: "Our AI is still learning and may be inaccurate. Please verify using links below.",
        timestamp: "2024-11-14T07:30:00",
        sender: dummyUsers[1],
      },
      {
        id: "msg-6",
        content: "linkhere.com",
        timestamp: "2024-11-14T07:30:10",
        sender: dummyUsers[1],
      },
    ],
  },
  {
    id: "chat-3",
    type: "chat",
    user: dummyUsers[2],
    lastMessage: "Primary database connection has been lost.",
    timestamp: "2024-11-14T11:30:00",
  },
  {
    id: "chat-4",
    type: "chat",
    user: dummyUsers[3],
    lastMessage: "Primary database connection has been lost.",
    timestamp: "2024-11-14T11:30:00",
  },
  {
    id: "chat-5",
    type: "chat",
    user: dummyUsers[4],
    lastMessage: "Primary database connection has been lost.",
    timestamp: "2024-11-14T11:30:00",
  },

  // Ticket notifications
  {
    id: "ticket-1",
    type: "ticket",
    ticketId: "TCK-0029",
    title: "Delivery Delay Complaint",
    description:
      "Our scheduled fuel delivery was supposed to arrive yesterday but never came. this affectiung our operation",
    company: "TeckCorp Inc.",
    timestamp: "2024-11-14T11:30:00",
    assignedTo: dummyUsers[5],
    lastUpdate: "6:00 AM",
    priority: "high",
    status: "in progress",
    messages: [
      {
        id: "ticket-msg-1",
        content: "Hello",
        timestamp: "2024-11-14T18:52:00",
        sender: dummyUsers[5],
      },
      {
        id: "ticket-msg-2",
        content:
          "Welcome to Zoho Desks new Unified Ticket Screen. Here, you have complet received your first ticket, did you notice that it has been assigned to you? To the Auto-Suggested Solutions in the pane to your left.",
        timestamp: "2024-11-14T18:52:10",
        sender: dummyUsers[5],
      },
      {
        id: "ticket-msg-3",
        content:
          "When you're done composing your response, you may send it and close the ticket.",
        timestamp: "2024-11-14T18:52:20",
        sender: dummyUsers[5],
      },
      {
        id: "ticket-msg-4",
        content:
          "Whatever action you perform, be rest assured that you can always track them under the ticket's history. With that, you're one step closer to delivering top-notch customer service!",
        timestamp: "2024-11-14T18:52:30",
        sender: dummyUsers[5],
      },
      {
        id: "ticket-msg-5",
        content: "Cheers,\nTeckCorp Inc.\n1 888 900 9646",
        timestamp: "2024-11-14T18:52:40",
        sender: dummyUsers[5],
      },
    ],
  },

  // Alert notifications
  {
    id: "alert-1",
    type: "alert",
    title: "Driver Delayed",
    description: "ETA 45 mins late",
    timestamp: "2024-11-14T11:30:00",
    icon: "truck",
    severity: "warning",
    metadata: "John Smith (#FS-001)",
  },
  {
    id: "alert-2",
    type: "alert",
    title: "Delivery Failed",
    description: "Customer unavailable — Metro Gas Station",
    timestamp: "2024-11-14T11:30:00",
    icon: "package-x",
    severity: "critical",
    metadata: "Assigned driver: John Smith",
  },
  {
    id: "alert-3",
    type: "alert",
    title: "Delivery Failed",
    description: "Customer unavailable — Metro Gas Station",
    timestamp: "2024-11-14T11:30:00",
    icon: "package-open",
    severity: "info",
    metadata: "Assigned driver: John Smith",
  },
  {
    id: "alert-4",
    type: "alert",
    title: "Delivery Failed",
    description: "Customer unavailable — Metro Gas Station",
    timestamp: "2024-11-14T11:30:00",
    icon: "package-x",
    severity: "critical",
    metadata: "Assigned driver: John Smith",
  },
  {
    id: "alert-5",
    type: "alert",
    title: "New Driver Added",
    description: "Successfully onboarded to fleet",
    timestamp: "2024-11-14T11:30:00",
    icon: "user-plus",
    severity: "info",
    metadata: "Michael Carter",
  },
  {
    id: "alert-6",
    type: "alert",
    title: "New Driver Added",
    description: "Successfully onboarded to fleet",
    timestamp: "2024-11-14T11:30:00",
    icon: "user-plus",
    severity: "info",
    metadata: "Michael Carter",
  },

  // System notifications
  {
    id: "system-1",
    type: "system",
    title: "Database Connection Lost",
    description: "Primary database connection has been lost. Switching to backup server.",
    timestamp: "2024-11-14T11:30:00",
    severity: "critical",
    status: "active",
  },
  {
    id: "system-2",
    type: "system",
    title: "Database Connection Lost",
    description: "Primary database connection has been lost. Switching to backup server.",
    timestamp: "2024-11-14T11:30:00",
    severity: "critical",
    status: "active",
  },
  {
    id: "system-3",
    type: "system",
    title: "Database Connection Lost",
    description: "Primary database connection has been lost. Switching to backup server.",
    timestamp: "2024-11-14T11:30:00",
    severity: "critical",
    status: "active",
  },
];