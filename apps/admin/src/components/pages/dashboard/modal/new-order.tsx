"use client";

import { useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
  Input,
  Button,
  Label,
} from "@repo/components";

export function NewOrderForm() {
  // ✅ Properly named states
  const [client, setClient] = useState("");
  const [address, setAddress] = useState("");
  const [status, setStatus] = useState("");
  const [driver, setDriver] = useState("");
  const [date, setDate] = useState("");
  const [priority, setPriority] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      client,
      address,
      status,
      driver,
      date,
      priority,
    });
  };

  return (
    <div className="max-w-md w-full bg-white rounded-xl shadow-lg py-2 relative">
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Client */}
        <div>
          <Label className="mb-1 block">Client</Label>
          <Select onValueChange={setClient}>
            <SelectTrigger>
              <SelectValue placeholder="Select Client" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="arthur">Arthur Gamora</SelectItem>
              <SelectItem value="ali">Ali Muqeet</SelectItem>
              <SelectItem value="john">John Mosh</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Address */}
        <div>
          <Label className="mb-1 block">Address</Label>
          <Input
            type="text"
            placeholder="Enter your address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        {/* Status */}
        <div>
          <Label className="mb-1 block">Status</Label>
          <Select onValueChange={setStatus}>
            <SelectTrigger>
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="warehouse">Warehouse</SelectItem>
              <SelectItem value="stationA">Station A</SelectItem>
              <SelectItem value="stationB">Station B</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Driver */}
        <div>
          <Label className="mb-1 block">Driver</Label>
          <Select onValueChange={setDriver}>
            <SelectTrigger>
              <SelectValue placeholder="Select Driver" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="john">John Doe</SelectItem>
              <SelectItem value="jane">Jane Smith</SelectItem>
              <SelectItem value="alex">Alex Johnson</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Date */}
        <div>
          <Label className="mb-1 block">Date</Label>
          <Select onValueChange={setDate}>
            <SelectTrigger>
              <SelectValue placeholder="Schedule Your Order" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="tomorrow">Tomorrow</SelectItem>
              <SelectItem value="next-week">Next Week</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Priority */}
        <div>
          <Label className="mb-1 block">Priority</Label>
          <Select onValueChange={setPriority}>
            <SelectTrigger>
              <SelectValue placeholder="Select Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Submit */}
        <Button type="submit" className="w-full mt-4">
          Place Order
        </Button>
      </form>
    </div>
  );
}
