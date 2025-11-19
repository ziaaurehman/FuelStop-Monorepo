"use client";

import { useState } from "react";

import { Driver } from "@/data/drivers";
import { ResponsiveModal } from "@repo/components";
import { DriverDetailsContent } from "./details-content";

interface DriverDetailsModalProps {
  driver: Driver;
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function DriverDetailsModal({
  driver,
  trigger,
  open,
  onOpenChange,
}: DriverDetailsModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenChange = (newOpen: boolean) => {
    if (onOpenChange) {
      onOpenChange(newOpen);
    } else {
      setIsOpen(newOpen);
    }
  };

  const modalOpen = open !== undefined ? open : isOpen;

  return (
    <ResponsiveModal
      open={modalOpen}
      onOpenChange={handleOpenChange}
      size="xl"
      trigger={trigger}
    >
      <DriverDetailsContent driver={driver} />
    </ResponsiveModal>
  );
}
