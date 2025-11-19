import { Button, ResponsiveModal } from "@repo/components";
import { Bell, Plus, Search } from "lucide-react";
import { NewOrderForm } from "./modal/new-order";
import { ReactNode } from "react";
import Link from "next/link";

interface HeaderActionsProps {
  /** Optional custom modal node to override the default New Order modal */
  customModal?: ReactNode;
}

export function HeaderActions({ customModal }: HeaderActionsProps) {
  // Default ResponsiveModal setup
  const defaultModal = (
    <ResponsiveModal
      trigger={
        <Button className="gap-2 ">
          <Plus className="h-4 w-4" />
          <span className="hidden md:block">New Order</span>
        </Button>
      }
      title="New Order"
      description="Place a new fuel order with flexible delivery options"
      size="md"
    >
      <NewOrderForm />
    </ResponsiveModal>
  );

  return (
    <div className="flex items-center gap-2">
      <Search className="h-5 w-5" />
      <Link href={"/notification-center/all"}>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-600" />
        </Button>
      </Link>

      {/* Render custom modal if provided, otherwise use default */}
      {customModal ?? defaultModal}
    </div>
  );
}
