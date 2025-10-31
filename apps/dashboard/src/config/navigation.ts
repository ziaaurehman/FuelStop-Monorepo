import {
    Home,
    ShoppingCart,
    Gauge,
    Truck,
    FileText,
    Settings,
    HelpCircle,
    type LucideIcon,
  } from "lucide-react";
  
  export interface NavItem {
    title: string;
    href: string;
    icon: LucideIcon;
    badge?: string;
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
          href: "/",
          icon: Home,
        },
        {
          title: "Orders",
          href: "/orders",
          icon: ShoppingCart,
        },
        {
          title: "Fuel Usage",
          href: "/fuel-usage",
          icon: Gauge,
        },
        {
          title: "Delivery Tracking",
          href: "/delivery-tracking",
          icon: Truck,
        },
        {
          title: "Invoices & Payments",
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
          href: "/settings",
          icon: Settings,
        },
        {
          title: "Support",
          href: "/support",
          icon: HelpCircle,
        },
      ],
    },
  ];