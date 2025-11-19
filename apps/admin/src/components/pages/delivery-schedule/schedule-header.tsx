"use client";

import { Input, Button } from "@repo/components";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/components";
import { Search, LayoutGrid, Calendar } from "lucide-react";


export function ScheduleHeader() {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
      {/* Search and Filters */}
      <div className="flex items-center gap-3 w-full md:w-auto">
        <div className="relative flex-1 md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search deliveries..." className="pl-9" />
        </div>

        {/* View Toggle */}
        <div className="hidden md:flex items-center gap-1 border rounded-lg p-1">
          <Button variant="ghost" size="sm" className="bg-muted">
            <LayoutGrid className="h-4 w-4 mr-2" />
            Board
          </Button>
          <Button variant="ghost" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Calendar
          </Button>
        </div>
      </div>

      {/* Right Side Filters */}
      <div className="hidden md:flex items-center gap-3">
        <Select defaultValue="all">
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="All Drivers" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Drivers</SelectItem>
            <SelectItem value="john">John Smith</SelectItem>
            <SelectItem value="jane">Jane Doe</SelectItem>
          </SelectContent>
        </Select>

        <Select defaultValue="all">
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="All Districts" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Districts</SelectItem>
            <SelectItem value="downtown">Downtown</SelectItem>
            <SelectItem value="uptown">Uptown</SelectItem>
          </SelectContent>
        </Select>

        <Select defaultValue="default">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Optimize Route" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Optimize Route</SelectItem>
            <SelectItem value="distance">By Distance</SelectItem>
            <SelectItem value="time">By Time</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
