"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/components";
import { useOrdersStore } from "@/stores/orders-store";

export type OrderPriorityFilter = "all" | "high" | "medium" | "low";
export type OrderQuantityFilter = "all" | "0-200" | "200-400" | "400+";
export type OrderLocationFilter = "all" | "downtown" | "uptown";

interface OrderFiltersProps {
  resultCount?: number;
  totalCount?: number;
  showQuantity?: boolean;
  showLocation?: boolean;
}

export function OrderFilters({
  resultCount,
  totalCount,
  showQuantity = true,
  showLocation = true,
}: OrderFiltersProps) {
  const {
    priorityFilter,
    quantityFilter,
    locationFilter,
    setPriorityFilter,
    setQuantityFilter,
    setLocationFilter,
  } = useOrdersStore();
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 py-3">
      <div className="flex items-center gap-2 w-full sm:w-auto">
        <Select value={priorityFilter} onValueChange={setPriorityFilter}>
          <SelectTrigger className="w-full sm:w-[130px] h-9">
            <SelectValue placeholder="Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priority</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="low">Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {showQuantity && (
        <Select value={quantityFilter} onValueChange={setQuantityFilter}>
          <SelectTrigger className="w-full sm:w-[130px] h-9">
            <SelectValue placeholder="Quantity" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Quantity</SelectItem>
            <SelectItem value="0-200">0-200 gal</SelectItem>
            <SelectItem value="200-400">200-400 gal</SelectItem>
            <SelectItem value="400+">400+ gal</SelectItem>
          </SelectContent>
        </Select>
      )}

      {showLocation && (
        <Select value={locationFilter} onValueChange={setLocationFilter}>
          <SelectTrigger className="w-full sm:w-[130px] h-9">
            <SelectValue placeholder="Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Location</SelectItem>
            <SelectItem value="downtown">Downtown</SelectItem>
            <SelectItem value="uptown">Uptown</SelectItem>
          </SelectContent>
        </Select>
      )}

      {(resultCount !== undefined || totalCount !== undefined) && (
        <div className="sm:ml-auto text-sm text-muted-foreground w-full sm:w-auto text-left sm:text-right">
          {resultCount !== undefined && totalCount !== undefined
            ? `Showing ${resultCount} of ${totalCount} orders`
            : resultCount !== undefined
              ? `Showing ${resultCount} orders`
              : totalCount !== undefined
                ? `Total: ${totalCount} orders`
                : null}
        </div>
      )}
    </div>
  );
}
