"use client";

import { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@repo/components/ui/dropdown-menu";
import { Button } from "@repo/components";
import { ChevronDown, Settings, Shield, User, UserX } from "lucide-react";
import { Member } from "@/data";

interface RoleSelectorProps {
  member: Member;
}

const roleConfig = {
  owner: {
    label: "Owner",
    icon: Shield,
    variant: "default" as const,
  },
  admin: {
    label: "Admin",
    icon: Settings,
    variant: "default" as const,
  },
  member: {
    label: "Member",
    icon: User,
    variant: "outline" as const,
  },
};

export function RoleSelector({ member }: RoleSelectorProps) {
  const [role, setRole] = useState(member.role);
  const [isOpen, setIsOpen] = useState(false);

  const currentRole = roleConfig[role];


  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="min-w-[130px]">
          {currentRole.label}
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[320px]">
        <DropdownMenuLabel className="text-muted-foreground font-normal">
          Select Role
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {/* Super Admin */}
        <DropdownMenuItem
          onClick={() => {
            setRole("owner");
            setIsOpen(false);
          }}
          className="flex flex-col items-start py-3 cursor-pointer"
        >
          <div className="flex items-center gap-2 mb-1">
            <Shield className="h-4 w-4" />
            <span className="font-medium">Super Admin</span>
          </div>
          <p className="text-xs text-muted-foreground pl-6">
            Can Change workspace settings & invite new members
          </p>
        </DropdownMenuItem>

        {/* Admin */}
        <DropdownMenuItem
          onClick={() => {
            setRole("admin");
            setIsOpen(false);
          }}
          className="flex flex-col items-start py-3 cursor-pointer"
        >
          <div className="flex items-center gap-2 mb-1">
            <Settings className="h-4 w-4" />
            <span className="font-medium">Admin</span>
          </div>
          <p className="text-xs text-muted-foreground pl-6">
            Can Change workspace settings & invite new members
          </p>
        </DropdownMenuItem>

        {/* Member */}
        <DropdownMenuItem
          onClick={() => {
            setRole("member");
            setIsOpen(false);
          }}
          className="flex flex-col items-start py-3 cursor-pointer"
        >
          <div className="flex items-center gap-2 mb-1">
            <User className="h-4 w-4" />
            <span className="font-medium">Member</span>
          </div>
          <p className="text-xs text-muted-foreground pl-6">
            Cannot Change workspace settings but can invite new members
          </p>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Remove from workspace */}
        <DropdownMenuItem className="text-red-600 cursor-pointer">
          <UserX className="mr-2 h-4 w-4" />
          Remove from workspace
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
