import { Home, Package, Truck, CreditCard, Settings } from "lucide-react";
import type { NavItem } from "@/types/nav";

export const sidebarNavItems: NavItem[] = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Orders", href: "/orders", icon: Package },
  { name: "Fuel Usage", href: "/fuel-usage", icon: Truck },
  { name: "Invoices & Payments", href: "/invoices", icon: CreditCard },
  { name: "Settings", href: "/settings", icon: Settings },
];
