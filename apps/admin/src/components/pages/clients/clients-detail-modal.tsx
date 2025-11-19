"use client";

import { useState } from "react";
import { Client } from "@/data/clients";
import { ResponsiveModal } from "@repo/components";
import { ClientDetailsContent } from "./clients-content";

interface ClientDetailsModalProps {
  client: Client;
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function ClientDetailsModal({
  client,
  trigger,
  open,
  onOpenChange,
}: ClientDetailsModalProps) {
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
      <ClientDetailsContent client={client} />
    </ResponsiveModal>
  );
}
