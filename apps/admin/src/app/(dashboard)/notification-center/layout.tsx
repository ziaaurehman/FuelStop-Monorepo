"use client";

import { usePathname, useRouter } from "next/navigation";
import { Button } from "@repo/components";
import { cn } from "@/lib";
import { AppHeader, HeaderActions } from "@/components";

const tabs = [
  { label: "All", path: "/notification-center/all" },
  { label: "Team Chat", path: "/notification-center/team-chat" },
  { label: "System Messages", path: "/notification-center/system-messages" },
  { label: "Client Tickets", path: "/notification-center/client-tickets" },
  { label: "Alerts", path: "/notification-center/alerts" },
];

export default function NotificationCenterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="flex h-[calc(100vh-2rem)] flex-col ">
      <AppHeader headerActions={<HeaderActions/>}/>
      {/* Tabs */}
      <div className="border-b bg-white p-4 md:p-6">
        <div className="flex gap-1 overflow-x-auto scrollbar-none">
          {tabs.map((tab) => {
            const isActive = pathname === tab.path;
            return (
              <Button
                key={tab.path}
                variant="ghost"
                className={cn(
                  "rounded-none border-b-2 border-transparent px-4 py-3 text-sm font-medium transition-colors hover:bg-transparent hover:text-foreground whitespace-nowrap",
                  isActive
                    ? "border-primary text-foreground"
                    : "text-muted-foreground"
                )}
                onClick={() => router.push(tab.path)}
              >
                {tab.label}
              </Button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">{children}</div>
    </div>
  );
}