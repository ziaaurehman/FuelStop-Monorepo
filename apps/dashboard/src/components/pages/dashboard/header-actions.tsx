import { Button } from "@repo/components";
import { Bell, Plus, Search } from "lucide-react";

export function HeaderActions() {
  return (
    <div className="flex items-center gap-2">
      <Search className="h-5 w-5" />
      <Button variant="ghost" size="icon" className="relative">
        <Bell className="h-5 w-5" />
        <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-600" />
      </Button>
      <Button className="gap-2 bg-primary text-white">
        <Plus className="h-4 w-4" />{" "}
        <span className="hidden md:block">New Order</span>
      </Button>
    </div>
  );
}

// export default HeaderActions;
