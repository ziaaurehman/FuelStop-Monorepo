"use client";

import { useState } from "react";
import {
  CreateScheduleDialog,
  ScheduleBoard,
  ScheduleHeader,
  ScheduleMobile,
} from "@/components";
import { useMediaQuery } from "@repo/components/hooks/use-media-query";
import { useScheduleUrlSync } from "@/hooks/use-schedule-url-sync";

/**
 * Main delivery schedule page component.
 * Manages schedule board/calendar view with filtering and search.
 */
export default function DeliverySchedulePage() {
  useScheduleUrlSync();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <div className="space-y-4">
      {/* Header with Filters and View Toggle */}
      <ScheduleHeader />

      {/* Desktop: Kanban Board | Mobile: Tabs */}
      {isMobile ? (
        <ScheduleMobile onAddClick={() => setIsCreateDialogOpen(true)} />
      ) : (
        <ScheduleBoard />
      )}

      {/* Create Schedule Dialog */}
      <CreateScheduleDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
      />
    </div>
  );
}
