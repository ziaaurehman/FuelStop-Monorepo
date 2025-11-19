"use client";
import {
  AppHeader,
  HeaderActions,
  InfoCard,
  MobileSettingsNav,
} from "@/components";
import { Session, sessions } from "@/data";
import { Checkbox, DataTable, TableColumnHeader } from "@repo/components";
import { ColumnDef } from "@tanstack/react-table";
import { X } from "lucide-react";
import React, { useState } from "react";

const Page = () => {
  const [loading] = useState(false);

  // Define table columns
  const columns: ColumnDef<Session>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="translate-y-[2px]"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-[2px]"
          onClick={(e) => e.stopPropagation()}
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "Browser",
      header: ({ column }) => (
        <TableColumnHeader column={column} title="Browser" />
      ),
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("Browser")}</div>
      ),
      enableSorting: true,
    },
    {
      accessorKey: "location",
      header: ({ column }) => (
        <TableColumnHeader column={column} title="Location" />
      ),
      cell: ({ row }) => (
        <div className="text-muted-foreground">{row.getValue("location")}</div>
      ),
      enableSorting: true,
    },
    {
      accessorKey: "IP",
      header: ({ column }) => (
        <TableColumnHeader column={column} title="IP Address" />
      ),
      cell: ({ row }) => (
        <div className="text-muted-foreground">{row.getValue("IP")}</div>
      ),
      enableSorting: true,
    },
    {
      accessorKey: "mostRecentActivity",
      header: ({ column }) => (
        <TableColumnHeader column={column} title="Most Recent Activity" />
      ),
      cell: ({ row }) => (
        <div className="text-muted-foreground">
          {row.getValue("mostRecentActivity")}
        </div>
      ),
      enableSorting: true,
    },
    {
      id: "actions",
      header: () => <div className="text-right">Actions</div>,
      cell: () => {
        return (
          <div className="flex items-center justify-end gap-3">
            <X className="h-5 w-5 text-muted-foreground" />
          </div>
        );
      },
    },
  ];
  return (
    <div>
      <AppHeader headerActions={<HeaderActions />} />
      <div className="md:hidden px-4 pt-4">
        <MobileSettingsNav />
      </div>
      <div className="md:p-8 p-4 space-y-4 ">
        <InfoCard
          title="Change Password"
          description="Update Password for enhanced account security"
          buttonText="Change Password"
        />
        <InfoCard
          title="Two Factor Authentication"
          description="Add an Extra Layer of Protection to Your Account"
          buttonText="Manage Authentication"
        />
        <InfoCard
          title="Active Sessions"
          description="Monitor and Manage all Your Active Sessions"
          buttonText="Logout All Sessions"
        />

        <DataTable
          columns={columns}
          data={sessions}
          searchKey="Browser"
          searchPlaceholder="Search sessions..."
          showSearch={false}
          showExport={false}
          showPagination={true}
          pageSize={10}
          loading={loading}
          emptyMessage="No sessions found."
          mobileColumns={["Browser", "location"]}
        />
      </div>
    </div>
  );
};

export default Page;
