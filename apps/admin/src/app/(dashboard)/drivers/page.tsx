"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  Badge,
  Button,
  Checkbox,
  DataTable,
  TableColumnHeader,
  TableRowActions,
  getStatusColor,
} from "@repo/components";
import { AppHeader, HeaderActions, DriverDetailsModal } from "@/components";
import { Edit, Plus, Trash2, Truck, UserCog, UserPlus } from "lucide-react";
import { Driver, drivers } from "@/data";
import { ActionItem } from "@/types";

export default function DriversPage() {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [loading] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredData = drivers.filter((driver) => {
    if (statusFilter !== "all" && driver.status !== statusFilter) return false;
    return true;
  });

  const handleAssignDriver = (driver: Driver) => {
    setSelectedDriver(driver);
    setIsModalOpen(true);
  };

  const rowActions: ActionItem<Driver>[] = [
    {
      label: "Assign",
      icon: UserCog,
      variant: "assign",
      onClick: (row: Driver) => handleAssignDriver(row),
      renderAsButton: () => (
        <Button size="sm" className="w-full">
          <UserPlus className="h-4 w-4" />
          Assign
        </Button>
      ),
    },
    {
      label: "Edit",
      icon: Edit,
      variant: "edit",
      onClick: (row: Driver) => console.log("Edit driver:", row),
    },
    {
      label: "Delete",
      icon: Trash2,
      variant: "delete",
      onClick: (row: Driver) => console.log("Delete driver:", row),
    },
  ];

  const columns: ColumnDef<Driver>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          onClick={(e) => e.stopPropagation()}
        />
      ),
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <TableColumnHeader column={column} title="Driver" />
      ),
      cell: ({ row }) => {
        const { name, avatar } = row.original;
        const initials = name
          .split(" ")
          .map((n) => n[0])
          .join("");
        return (
          <div className="flex items-center">
            <Avatar className="h-8 w-8 mr-2">
              <AvatarImage src={avatar} alt={name} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <span>{name}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "vehicle",
      header: ({ column }) => (
        <TableColumnHeader column={column} title="Vehicle" />
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <div className="bg-primary p-1 rounded-full">
            <Truck className="h-4 w-4 text-white" />
          </div>
          {row.getValue("vehicle")}
        </div>
      ),
    },
    {
      accessorKey: "location",
      header: ({ column }) => (
        <TableColumnHeader column={column} title="Location" />
      ),
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <TableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        return (
          <Badge variant="secondary" className={getStatusColor(status)}>
            <span className="mr-1 h-2 w-2 rounded-full bg-current" />
            {status === "on break"
              ? "On Break"
              : status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        );
      },
    },
    {
      accessorKey: "id",
      header: ({ column }) => <TableColumnHeader column={column} title="ID" />,
    },
    {
      accessorKey: "number",
      header: ({ column }) => (
        <TableColumnHeader column={column} title="Number" />
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <TableRowActions
          row={row.original}
          actions={rowActions as ActionItem[]}
        />
      ),
    },
  ];

  return (
    <div>
      <AppHeader
        headerActions={
          <HeaderActions
            customModal={
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                <span className="hidden md:block">New Driver</span>
              </Button>
            }
          />
        }
      />
      <div className="md:p-8 p-4 space-y-4">
        {/* Filter Tabs */}
        <div className="flex items-center gap-2 border-b overflow-x-auto">
          <Button
            variant="ghost"
            className={
              statusFilter === "all"
                ? "border-b-2 border-primary rounded-b-none"
                : "rounded-b-none"
            }
            onClick={() => setStatusFilter("all")}
          >
            All Drivers
          </Button>
          <Button
            variant="ghost"
            className={
              statusFilter === "active"
                ? "border-b-2 border-primary rounded-b-none"
                : "rounded-b-none"
            }
            onClick={() => setStatusFilter("active")}
          >
            Active
          </Button>
          <Button
            variant="ghost"
            className={
              statusFilter === "on break"
                ? "border-b-2 border-primary rounded-b-none"
                : "rounded-b-none"
            }
            onClick={() => setStatusFilter("on break")}
          >
            On Break
          </Button>
          <Button
            variant="ghost"
            className={
              statusFilter === "offline"
                ? "border-b-2 border-primary rounded-b-none"
                : "rounded-b-none"
            }
            onClick={() => setStatusFilter("offline")}
          >
            Offline
          </Button>
        </div>

        {/* Data Table */}
        <DataTable
          columns={columns}
          data={filteredData}
          searchKey="name"
          searchPlaceholder="Search drivers..."
          showSearch={true}
          showExport={true}
          showPagination={true}
          pageSize={10}
          loading={loading}
          emptyMessage="No drivers found."
        />
      </div>

      {/* Driver Details Modal */}
      {selectedDriver && (
        <DriverDetailsModal
          driver={selectedDriver}
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
        />
      )}
    </div>
  );
}
