import {
  Home,
  ShoppingCart,
  Gauge,
  Truck,
  FileText,
  Settings,
  HelpCircle,
  Bell,
  SlidersHorizontal,
  type LucideIcon,
  Crown,
} from "lucide-react";

export interface NavItem {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
  children?: NavItem[]; // ✅ Support nested children
}

export interface NavGroup {
  title?: string;
  items: NavItem[];
}

export const navigationConfig: NavGroup[] = [
  {
    items: [
      {
        title: "Dashboard",
        description: "Organize and access fuel analytics",
        href: "/",
        icon: Home,
      },
      {
        title: "Orders",
        description: "Track and manage fuel deliveries",
        href: "/orders",
        icon: ShoppingCart,
      },
      {
        title: "Fuel Usage",
        description: "Get up-to-date updates about your fuel usage",
        href: "/fuel-usage",
        icon: Gauge,
      },
      {
        title: "Delivery Tracking",
        description: "Monitor your fuel delivery in real-time",
        href: "/delivery-tracking",
        icon: Truck,
      },
      {
        title: "Invoices & Payments",
        description:
          "View, download, and manage all your fuel invoices and payments",
        href: "/invoices",
        icon: FileText,
      },
    ],
  },
  {
    title: "System",
    items: [
      {
        title: "Settings",
        description: "Configure system preferences",
        href: "/settings",
        icon: Settings,
        children: [
          {
            title: "General",
            description: "Manage your general platform settings",
            href: "/settings/general",
            icon: SlidersHorizontal,
          },
          {
            title: "Admin Role",
            description: "Control and assign admin roles and permissions",
            href: "/settings/admin-role",
            icon: Crown,
          },
          {
            title: "Notifications",
            description: "Update your notification preferences",
            href: "/settings/notifications",
            icon: Bell,
          },
        ],
      },
      {
        title: "Support",
        description: "Standing by your side no matter what",
        href: "/support",
        icon: HelpCircle,
      },
    ],
  },
];
