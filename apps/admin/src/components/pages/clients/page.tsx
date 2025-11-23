"use client";

import { useMemo, useState } from "react";
import { Button } from "@repo/components";
import { Edit, Trash2, Info } from "lucide-react";
import type { Client } from "@/data/clients";
import { ActionItem } from "@/types";
import { ClientDetailsModal } from "@/components";
import { useClientsStore } from "@/stores/clients-store";
import { useClientsUrlSync } from "@/hooks/use-clients-url-sync";
import { useClients } from "@/hooks/queries";
import { ClientStatusTabs } from "./client-status-tabs";
import { useClientColumns } from "./use-client-columns";
import { ClientTable } from "./client-table";
import { ClientsTableSkeleton } from "./clients-table-skeleton";

export default function ClientsPage() {
  useClientsUrlSync();
  const { statusFilter, searchQuery } = useClientsStore();
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Use React Query hook to fetch clients
  const {
    data: clientsData,
    isLoading,
    isError,
    error,
  } = useClients({
    statusFilter,
    searchQuery: searchQuery || undefined,
  });

  const clients = clientsData?.clients ?? [];

  const handleMoreInfo = (client: Client) => {
    setSelectedClient(client);
    setIsModalOpen(true);
  };

  // Define row actions
  const rowActions: ActionItem<Client>[] = useMemo(
    () => [
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
    ],
    []
  );

  // Get columns using the hook
  const columns = useClientColumns({ rowActions });

  const handleRowClick = (client: Client) => {
    console.log("Row clicked:", client);
  };

  // Show loading skeleton while fetching
  if (isLoading) {
    return (
      <div className="space-y-4">
        <ClientStatusTabs />
        <ClientsTableSkeleton />
      </div>
    );
  }

  // Show error state (optional - you can customize this)
  if (isError) {
    console.error("Failed to fetch clients:", error);
    return (
      <div className="space-y-4">
        <ClientStatusTabs />
        <div className="text-center text-muted-foreground py-8">
          Failed to load clients. Please try again.
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <ClientStatusTabs />

      <ClientTable
        columns={columns}
        data={clients}
        loading={false}
        onRowClick={handleRowClick}
        mobileColumns={["name", "status"]}
      />

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
