import {
  Home,
  ShoppingCart,
  FileText,
  Settings,
  HelpCircle,
  Bell,
  SlidersHorizontal,
  type LucideIcon,
  Crown,
  UserRound,
  UsersRound,
  CalendarDays,
  ChartSpline,
  HandCoins,
  ShieldCheck,
  Cable,
  Earth,
  KeyRound,
} from "lucide-react";

export interface NavItem {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
  children?: NavItem[];
  hidden?: boolean;
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
        title: "Drivers",
        description: "Manage Driver Assignment and track performance",
        href: "/drivers",
        icon: UserRound,
      },
      {
        title: "Clients",
        description: "Manage and Track all of business clients",
        href: "/clients",
        icon: UsersRound,
      },
      {
        title: "Delivery Schedule",
        description: "Manage Your schedule assignments and track performance",
        href: "/delivery-schedule",
        icon: CalendarDays,
      },
      {
        title: "Reports",
        description:
          "View, download, and manage all your fuel invoices and payments",
        href: "/reports",
        icon: ChartSpline,
      },
      {
        title: "Billing & Invoices",
        description: "Manage and track performance of billing, invoices",
        href: "/billing",
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
            title: "Fuel Price",
            description: "Manage Your Fuel Price configuration",
            href: "/settings/fuel-price",
            icon: HandCoins,
          },
          {
            title: "Notifications",
            description: "Update your notification preferences",
            href: "/settings/notifications",
            icon: Bell,
          },
          {
            title: "Security",
            description: "Manage Your security Settings",
            href: "/settings/security",
            icon: ShieldCheck,
          },
          {
            title: "Api Key",
            description: "Manage Your API Keys",
            href: "/settings/api-key",
            icon: KeyRound,
          },
          {
            title: "Integrations",
            description: "Supercharge Your workflow and connect tools you use",
            href: "/settings/integrations",
            icon: Cable,
          },
          {
            title: "Localization",
            description: "Manage Your localization Settings",
            href: "/settings/localization",
            icon: Earth,
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
  {
    // Header-only items
    items: [
      {
        title: "Notification Center",
        description: "Check your notifications here",
        href: "/notification-center",
        icon: Bell,
        hidden: true, // 👈 add this
      },
    ],
  },
];
