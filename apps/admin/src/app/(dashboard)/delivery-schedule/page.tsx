"use client";

import { useState } from "react";
import {
  AppHeader,
  CreateScheduleDialog,
  HeaderActions,
  ScheduleBoard,
  ScheduleHeader,
  ScheduleMobile,
} from "@/components";
import { useMediaQuery } from "@repo/components/hooks/use-media-query";
import { Button } from "@repo/components";
import { Plus } from "lucide-react";

export default function DeliverySchedulePage() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <div>
      <AppHeader
        headerActions={
          <HeaderActions
            customModal={
              <Button
                onClick={() => setIsCreateDialogOpen(true)}
                className="gap-2"
              >
                <Plus className="h-4 w-4" />
                <span className="hidden md:block">New Schedule</span>
              </Button>
            }
          />
        }
      />
      <div className="md:p-8 p-4 space-y-4">
        {/* Header with Filters and View Toggle */}
        <ScheduleHeader />

        {/* Desktop: Kanban Board | Mobile: Tabs */}
        {isMobile ? (
          <ScheduleMobile onAddClick={() => setIsCreateDialogOpen(true)} />
        ) : (
          <ScheduleBoard />
        )}
      </div>

      {/* Create Schedule Dialog */}
      <CreateScheduleDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
      />
    </div>
  );
}
