"use client";

import {
  AppHeader,
  HeaderActions,
  MobileSettingsNav,
  RoleSelector,
} from "@/components";
import { ColumnDef } from "@tanstack/react-table";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Checkbox,
  DataTable,
  TableColumnHeader,
} from "@repo/components";
import { Member, members } from "@/data/members";
import { useState } from "react";

const Page = () => {
  const [loading] = useState(false);

  // Define columns
  const columns: ColumnDef<Member>[] = [
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
      accessorKey: "name",
      header: ({ column }) => (
        <TableColumnHeader column={column} title="Member Full Name" />
      ),
      cell: ({ row }) => {
        const member = row.original;
        const initials = member.name
          .split(" ")
          .map((n) => n[0])
          .join("");
        return (
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={member.avatar} alt={member.name} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <span className="font-medium">{member.name}</span>
          </div>
        );
      },
      enableSorting: true,
    },
    {
      accessorKey: "email",
      header: ({ column }) => (
        <TableColumnHeader column={column} title="Email Address" />
      ),
      cell: ({ row }) => (
        <div className="text-muted-foreground">{row.getValue("email")}</div>
      ),
      enableSorting: true,
    },
    {
      accessorKey: "lastActivity",
      header: ({ column }) => (
        <TableColumnHeader column={column} title="Last Activity" />
      ),
      cell: ({ row }) => (
        <div className="text-muted-foreground">
          {row.getValue("lastActivity")}
        </div>
      ),
      enableSorting: true,
    },
    {
      accessorKey: "role",
      header: ({ column }) => (
        <TableColumnHeader column={column} title="Role" />
      ),
      cell: ({ row }) => {
        return <RoleSelector member={row.original} />;
      },
    },
  ];

  return (
    <>
      <AppHeader headerActions={<HeaderActions />} />
      <div className="md:hidden px-4 pt-4">
        <MobileSettingsNav />
      </div>
      <div className="space-y-6 md:p-8 p-4">
        <DataTable
          columns={columns}
          data={members}
          searchKey="name"
          searchPlaceholder="Search members..."
          showSearch={false}
          showExport={false}
          showPagination={true}
          pageSize={10}
          loading={loading}
          emptyMessage="No members found."
          mobileColumns={["name", "role"]}
        />
      </div>
    </>
  );
};

export default Page;
