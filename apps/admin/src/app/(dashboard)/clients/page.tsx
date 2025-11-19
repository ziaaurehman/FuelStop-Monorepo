"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Button,
  Checkbox,
  DataTable,
  TableColumnHeader,
  TableRowActions,
  getStatusColor,
} from "@repo/components";
import { Edit, Trash2, Info, Plus } from "lucide-react";
import { AppHeader, ClientDetailsModal, HeaderActions } from "@/components";
import { clients, Client } from "@/data/clients";
import { ActionItem } from "@/types";

export default function ClientsPage() {
  const [loading] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredData = clients.filter((client) => {
    if (statusFilter !== "all" && client.status !== statusFilter) return false;
    return true;
  });

  const handleMoreInfo = (client: Client) => {
    setSelectedClient(client);
    setIsModalOpen(true);
  };

  const rowActions: ActionItem<Client>[] = [
    {
      label: "More Info",
      icon: Info,
      variant: "view",
      onClick: (row: Client) => handleMoreInfo(row),
      renderAsButton: () => (
        <Button size="sm" className="w-full">
          <Info className="h-4 w-4" />
          More Info
        </Button>
      ),
    },
    {
      label: "Edit",
      icon: Edit,
      variant: "edit",
      onClick: (row) => console.log("Edit", row),
    },
    {
      label: "Delete",
      icon: Trash2,
      variant: "delete",
      onClick: (row) => console.log("Delete", row),
    },
  ];

  const columns: ColumnDef<Client>[] = [
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
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <TableColumnHeader column={column} title="Client" />
      ),
      cell: ({ row }) => {
        const client = row.original;
        const initials = client.name
          .split(" ")
          .map((n) => n[0])
          .join("");
        return (
          <div className="flex items-center">
            <Avatar className="h-8 w-8 mr-2">
              <AvatarImage src={client.avatar} alt={client.name} />
              <AvatarFallback className="text-xs">{initials}</AvatarFallback>
            </Avatar>
            {client.name}
          </div>
        );
      },
    },
    {
      accessorKey: "company",
      header: ({ column }) => (
        <TableColumnHeader column={column} title="Company Name" />
      ),
    },
    {
      accessorKey: "email",
      header: ({ column }) => (
        <TableColumnHeader column={column} title="Email" />
      ),
    },
    {
      accessorKey: "phone",
      header: ({ column }) => (
        <TableColumnHeader column={column} title="Work Phone" />
      ),
    },
    {
      accessorKey: "receivables",
      header: ({ column }) => (
        <TableColumnHeader column={column} title="Receivables" />
      ),
    },
    {
      accessorKey: "unusedCredits",
      header: ({ column }) => (
        <TableColumnHeader column={column} title="Unused Credits" />
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
            {status}
          </Badge>
        );
      },
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
                <span className="hidden md:block">New Client</span>
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
            All Clients
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

        <DataTable
          columns={columns}
          data={filteredData}
          searchKey="name"
          searchPlaceholder="Search clients..."
          showSearch
          showExport
          showPagination
          mobileColumns={["name", "status"]}
          pageSize={10}
          loading={loading}
          emptyMessage="No clients found."
        />
      </div>

      {/* Client Details Modal */}
      {selectedClient && (
        <ClientDetailsModal
          client={selectedClient}
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
        />
      )}
    </div>
  );
}
