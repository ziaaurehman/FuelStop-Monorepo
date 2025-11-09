"use client";

import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Button,
} from "@repo/components";
import { ActionItem } from "@/types";
import { useMediaQuery } from "@repo/components/hooks/use-media-query";
import { cn } from "@/lib";

interface DataTableRowActionsProps<TData> {
  row: TData;
  actions: ActionItem[];
}

// Reusable function to get icon color class
function getIconColorClass(variant?: string) {
  return cn(
    "h-4 w-4",
    variant === "delete" && "text-red-600",
    variant === "edit" && "text-blue-500",
    variant === "view" && "text-green-400",
    (!variant || variant === "default") && "text-muted-foreground"
  );
}

export function TableRowActions<TData>({
  row,
  actions,
}: DataTableRowActionsProps<TData>) {
  const isMobile = useMediaQuery("(max-width: 768px)");

  // Shared render for action item (icon + click)
  const renderAction = (action: ActionItem, isIconOnly = false) => {
    const Icon = action.icon;

    if (action.mobileNode && isMobile) {
      return <div onClick={() => action.onClick(row)}>{action.mobileNode}</div>;
    }

    return (
      <Button
        variant={action.variant === "delete" ? "ghost" : "ghost"}
        size="icon"
        className={cn("h-8 w-8", isIconOnly && "p-0")}
        onClick={() => action.onClick(row)}
      >
        {Icon && <Icon className={getIconColorClass(action.variant)} />}
        {!isIconOnly && <span className="sr-only">{action.label}</span>}
      </Button>
    );
  };

  // Mobile: Horizontal icon buttons
  if (isMobile) {
    return (
      <div className="flex items-center gap-3">
        {actions.map((action, index) => (
          <div key={index}>{renderAction(action, true)}</div>
        ))}
      </div>
    );
  }

  // Desktop: Dropdown with labels
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        {actions.map((action, index) => (
          <div key={index}>
            {action.separator && <DropdownMenuSeparator />}
            <DropdownMenuItem
              onClick={() => action.onClick(row)}
              className={cn(
                action.variant === "delete" && "text-red-600 focus:text-red-600"
              )}
            >
              {action.icon && (
                <action.icon className={getIconColorClass(action.variant)} />
              )}
              <span className="ml-2">{action.label}</span>
            </DropdownMenuItem>
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
