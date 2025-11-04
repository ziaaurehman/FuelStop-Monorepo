// components/settings/sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigationConfig } from "@/config/navigation";

export function SettingsSidebar() {
  const pathname = usePathname();
  const settingsNav = navigationConfig
    .find((group) => group.title === "System")!
    .items.find((item) => item.href === "/settings")!.children!;

  return (
    <nav className="p-4 space-y-1">
      {settingsNav.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition ${
              isActive
                ? "bg-primary text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <item.icon className="h-4 w-4" />
            {item.title}
          </Link>
        );
      })}
    </nav>
  );
}
