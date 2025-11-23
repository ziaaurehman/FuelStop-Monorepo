import { Button } from "@repo/components";
import { Plus } from "lucide-react";

export const headerModals: Record<string, React.ReactNode | null> = {
  "/clients": (
    <Button className="gap-2">
      <Plus className="h-4 w-4" />
      <span className="hidden md:block">New Client</span>
    </Button>
  ),

  "/drivers": (
    <Button className="gap-2">
      <Plus className="h-4 w-4" />
      <span className="hidden md:block">New Driver</span>
    </Button>
  ),

  // No modal on settings
  "/settings": null,
};
