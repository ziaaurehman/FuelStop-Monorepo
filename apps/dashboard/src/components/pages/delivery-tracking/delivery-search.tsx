"use client";

import { Input } from "@repo/components";
import { Search } from "lucide-react";
import { useDeliveryTrackingStore } from "@/stores/delivery-tracking-store";
import { useDebounce } from "@/hooks/use-debounce";
import { useEffect, useState } from "react";

export function DeliverySearch() {
  const { searchQuery, setSearchQuery } = useDeliveryTrackingStore();
  const [localQuery, setLocalQuery] = useState(searchQuery);
  const debouncedQuery = useDebounce(localQuery, 300);

  // Update store when debounced query changes
  useEffect(() => {
    setSearchQuery(debouncedQuery);
  }, [debouncedQuery, setSearchQuery]);

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search by order ID, driver, destination..."
        value={localQuery}
        onChange={(e) => setLocalQuery(e.target.value)}
        className="pl-9 w-full sm:w-[300px]"
      />
    </div>
  );
}

