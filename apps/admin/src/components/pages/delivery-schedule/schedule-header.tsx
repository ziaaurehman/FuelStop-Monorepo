"use client";

import { useCallback, useState, useEffect } from "react";
import { Input, Button } from "@repo/components";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/components";
import { Search, LayoutGrid, Calendar } from "lucide-react";
import { useScheduleStore } from "@/stores/schedule-store";
import { useDebounce } from "@/hooks/use-debounce";
import { cn } from "@/lib";

/**
 * Schedule header component with search, view toggle, and filters.
 */
export function ScheduleHeader() {
  // Use selective subscriptions to prevent unnecessary re-renders
  const viewMode = useScheduleStore((state) => state.viewMode);
  const setViewMode = useScheduleStore((state) => state.setViewMode);
  const searchQuery = useScheduleStore((state) => state.searchQuery);
  const setSearchQuery = useScheduleStore((state) => state.setSearchQuery);
  const driverFilter = useScheduleStore((state) => state.driverFilter);
  const setDriverFilter = useScheduleStore((state) => state.setDriverFilter);
  const districtFilter = useScheduleStore((state) => state.districtFilter);
  const setDistrictFilter = useScheduleStore(
    (state) => state.setDistrictFilter
  );
  const routeOptimization = useScheduleStore(
    (state) => state.routeOptimization
  );
  const setRouteOptimization = useScheduleStore(
    (state) => state.setRouteOptimization
  );

  // Local state for immediate UI feedback, debounced update to store
  const [localSearch, setLocalSearch] = useState(searchQuery);
  const debouncedSearch = useDebounce(localSearch, 300);

  // Sync local search with store on mount
  useEffect(() => {
    setLocalSearch(searchQuery);
  }, [searchQuery]);

  // Update store when debounced value changes
  useEffect(() => {
    if (debouncedSearch !== searchQuery) {
      setSearchQuery(debouncedSearch);
    }
  }, [debouncedSearch, searchQuery, setSearchQuery]);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setLocalSearch(e.target.value);
    },
    []
  );

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
      {/* Search and Filters */}
      <div className="flex items-center gap-3 w-full md:w-auto">
        <div className="relative flex-1 md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search deliveries..."
            className="pl-9"
            value={localSearch}
            onChange={handleSearchChange}
          />
        </div>

        {/* View Toggle */}
        <div className="hidden md:flex items-center gap-1 border rounded-lg p-1">
          <Button
            variant="ghost"
            size="sm"
            className={cn(viewMode === "board" && "bg-muted")}
            onClick={() => setViewMode("board")}
          >
            <LayoutGrid className="h-4 w-4 mr-2" />
            Board
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={cn(viewMode === "calendar" && "bg-muted")}
            onClick={() => setViewMode("calendar")}
          >
            <Calendar className="h-4 w-4 mr-2" />
            Calendar
          </Button>
        </div>
      </div>

      {/* Right Side Filters */}
      <div className="hidden md:flex items-center gap-3">
        <Select value={driverFilter} onValueChange={setDriverFilter}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="All Drivers" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Drivers</SelectItem>
            <SelectItem value="John Smith">John Smith</SelectItem>
            <SelectItem value="Jane Doe">Jane Doe</SelectItem>
          </SelectContent>
        </Select>

        <Select value={districtFilter} onValueChange={setDistrictFilter}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="All Districts" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Districts</SelectItem>
            <SelectItem value="downtown">Downtown</SelectItem>
            <SelectItem value="uptown">Uptown</SelectItem>
          </SelectContent>
        </Select>

        <Select value={routeOptimization} onValueChange={setRouteOptimization}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Optimize Route" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Optimize Route</SelectItem>
            <SelectItem value="distance">By Distance</SelectItem>
            <SelectItem value="time">By Time</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
