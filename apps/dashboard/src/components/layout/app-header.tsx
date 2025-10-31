"use client";

import { Bell, Search, Plus, Fuel } from "lucide-react";
import { Button ,SidebarTrigger} from "@repo/components";

export function AppHeader() {
  return (
    <header className="flex h-16 items-center justify-between gap-4 bg-black text-white md:text-black md:bg-background px-2 md:p-6">
      <div className="flex md:gap-6 gap-2 items-center">
        <SidebarTrigger />

        <div className="hidden md:flex">
          <div className="relative max-w-md">
            <h1 className="text-xl font-semibold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground text-sm">
              Organize and access fuel access
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 py-3 md:hidden">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Fuel className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-semibold text-white">FuelStop</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Search className="h-5 w-5" />

        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-600" />
        </Button>

        <Button className="gap-2 bg-primary text-white">
          <Plus className="h-4 w-4" />
          New Order
        </Button>
      </div>
    </header>
  );
}
