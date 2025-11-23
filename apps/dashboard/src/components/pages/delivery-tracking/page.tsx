"use client";

import { useMemo } from "react";
import { useDeliveryTrackingStore } from "@/stores/delivery-tracking-store";
import { useDeliveryTrackingUrlSync } from "@/hooks/use-delivery-tracking-url-sync";
import { useDeliveryTracking } from "@/hooks/queries";
import { DeliveryCard } from "./delivery-card";
import { DeliveryStats } from "./delivery-stats";
import { DeliveryStatusFilter } from "./delivery-status-filter";
import { DeliverySearch } from "./delivery-search";
import { DeliveryStatsSkeleton } from "./delivery-stats-skeleton";
import { DeliveryCardSkeleton } from "./delivery-card-skeleton";

export default function DeliveryTrackingPage() {
  useDeliveryTrackingUrlSync();
  const { statusFilter, searchQuery } = useDeliveryTrackingStore();

  // Use React Query hook to fetch delivery tracking data
  const { data, isLoading, isError, error } = useDeliveryTracking(
    statusFilter,
    searchQuery
  );

  // Memoize data to prevent unnecessary re-renders
  const deliveries = useMemo(() => data?.deliveries ?? [], [data?.deliveries]);
  const stats = useMemo(() => data?.stats ?? [], [data?.stats]);

  // Show loading skeletons while fetching
  if (isLoading) {
    return (
      <>
        {/* Header with Filters */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <DeliveryStatusFilter />
          <DeliverySearch />
        </div>

        {/* Stats Skeleton */}
        <DeliveryStatsSkeleton />

        {/* Deliveries Section Skeleton */}
        <div className="space-y-4 mt-6">
          <h2 className="text-xl font-semibold">Current Deliveries</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((index) => (
              <DeliveryCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </>
    );
  }

  // Show error state
  if (isError) {
    console.error("Failed to fetch delivery tracking data:", error);
    return (
      <>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <DeliveryStatusFilter />
          <DeliverySearch />
        </div>
        <div className="text-center text-muted-foreground py-8">
          Failed to load delivery tracking data. Please try again.
        </div>
      </>
    );
  }

  return (
    <>
      {/* Header with Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <DeliveryStatusFilter />
        <DeliverySearch />
      </div>

      {/* Stats Cards */}
      {stats.length > 0 && <DeliveryStats stats={stats} />}

      {/* Current Deliveries Section */}
      <div className="space-y-4 mt-6">
        <h2 className="text-xl font-semibold">Current Deliveries</h2>
        {deliveries.length > 0 ? (
          <div className="space-y-4">
            {deliveries.map((delivery, index) => (
              <DeliveryCard key={`${delivery.id}-${index}`} delivery={delivery} />
            ))}
          </div>
        ) : (
          <div className="text-center text-muted-foreground py-8">
            No deliveries found matching your filters.
          </div>
        )}
      </div>
    </>
  );
}
