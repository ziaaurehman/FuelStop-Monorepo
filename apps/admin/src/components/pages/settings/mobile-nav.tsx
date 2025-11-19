// components/settings/mobile-nav.tsx
"use client";

import { usePathname, useRouter } from "next/navigation";
import { navigationConfig } from "@/config/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/components";
import { useEffect, useState } from "react";

export function MobileSettingsNav() {
  const pathname = usePathname();
  const router = useRouter();

  const settingsNav = navigationConfig
    .find((group) => group.title === "System")!
    .items.find((item) => item.href === "/settings")!.children!;

  const [selected, setSelected] = useState<string>(pathname);

  useEffect(() => {
    setSelected(pathname);
  }, [pathname]);

  return (
    <div className="w-full">
      <Select
        value={selected}
        onValueChange={(value) => {
          setSelected(value);
          router.push(value);
        }}
      >
        <SelectTrigger className="w-full focus:outline-none focus:ring-0">
          <SelectValue placeholder="Select..." />
        </SelectTrigger>
        <SelectContent>
          {settingsNav.map((item) => {
            const Icon = item.icon;
            return (
              <SelectItem key={item.href} value={item.href}>
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4" />
                  {item.title}
                </div>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
}
