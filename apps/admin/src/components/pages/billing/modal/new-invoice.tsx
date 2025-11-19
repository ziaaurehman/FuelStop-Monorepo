"use client";

import { useState } from "react";
import {
  Button,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/components";
import { Plus, Trash2, Search, Settings } from "lucide-react";
import { format } from "date-fns";

type InvoiceItem = {
  id: string;
  name: string;
  quantity: number;
  rate: number;
  tax: number;
};

export function NewInvoiceForm() {
  const [items, setItems] = useState<InvoiceItem[]>([
    { id: "1", name: "", quantity: 1, rate: 0, tax: 0 },
  ]);
  const [customer, setCustomer] = useState("");
  const [notes, setNotes] = useState("");

  const invoiceNumber = "INV-0000989";
  const invoiceDate = format(new Date("2025-08-22"), "dd MMM yyyy");
  const dueDate = format(new Date("2025-08-22"), "dd MMM yyyy");

  const addRow = () => {
    setItems((prev) => [
      ...prev,
      { id: crypto.randomUUID(), name: "", quantity: 1, rate: 0, tax: 0 },
    ]);
  };

  const removeRow = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateItem = (
    id: string,
    key: keyof InvoiceItem,
    value: string | number
  ) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [key]: value } : item))
    );
  };

  const total = items.reduce(
    (acc, item) => acc + item.quantity * item.rate + item.tax,
    0
  );

  const handleSubmit = (type: "draft" | "send") => {
    const invoiceData = {
      customer,
      items,
      notes,
      total,
      type,
    };
    console.log("Submitting Invoice:", invoiceData);
  };

  return (
    <form className="space-y-6 max-w-2xl">

      {/* Customer Section */}
      <div className="flex items-center gap-2">
        <div className="flex-1">
          <Label>Customer Name</Label>
          <Select onValueChange={setCustomer} value={customer}>
            <SelectTrigger>
              <SelectValue placeholder="Select a customer" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="metro-gas">Metro Gas Station</SelectItem>
              <SelectItem value="eco-energy">Eco Energy Co.</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button size="icon" className="mt-6">
          <Search className="h-4 w-4" />
        </Button>
      </div>

      {/* Invoice Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label>Invoice#</Label>
          <div className="flex items-center gap-2">
            <Input value={invoiceNumber} readOnly />
            <Button variant="ghost" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div>
          <Label>Invoice Date</Label>
          <Input value={invoiceDate} readOnly />
        </div>
        <div>
          <Label>Due Date</Label>
          <Input value={dueDate} readOnly />
        </div>
      </div>

      {/* Items Table */}
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item Name</TableHead>
              <TableHead className="w-[100px]">Quantity</TableHead>
              <TableHead className="w-[100px]">Rate</TableHead>
              <TableHead className="w-[100px]">Tax</TableHead>
              <TableHead className="w-[100px]">Amount</TableHead>
              <TableHead className="w-[50px]" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => {
              const amount = item.quantity * item.rate + item.tax;
              return (
                <TableRow key={item.id}>
                  <TableCell>
                    <Input
                      placeholder="Type or click to select good’s name"
                      value={item.name}
                      onChange={(e) =>
                        updateItem(item.id, "name", e.target.value)
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      min={1}
                      value={item.quantity}
                      onChange={(e) =>
                        updateItem(item.id, "quantity", Number(e.target.value))
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      min={0}
                      value={item.rate}
                      onChange={(e) =>
                        updateItem(item.id, "rate", Number(e.target.value))
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <Select
                      onValueChange={(val) =>
                        updateItem(item.id, "tax", Number(val))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Add Tax" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">No Tax</SelectItem>
                        <SelectItem value="5">5%</SelectItem>
                        <SelectItem value="10">10%</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>${amount.toFixed(2)}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeRow(item.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        <div className="flex items-center justify-between mt-3">
          <div className="flex gap-4 text-sm text-primary">
            <button
              type="button"
              onClick={addRow}
              className="flex items-center gap-1 font-medium"
            >
              <Plus className="h-4 w-4" /> Add New Row
            </button>
            <button
              type="button"
              className="flex items-center gap-1 font-medium"
            >
              <Plus className="h-4 w-4" /> Add in Bulk
            </button>
          </div>
          <div className="text-right text-sm font-medium">
            Total: <span className="font-semibold">${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Notes */}
      <div>
        <Label>Customer Notes</Label>
        <Textarea
          placeholder="Add a note to your invoice"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>

      {/* Footer Actions */}
      <div className="flex justify-end gap-3 border-t pt-4">
        <Button variant="outline" onClick={() => handleSubmit("draft")}>
          Save As Draft
        </Button>
        <Button onClick={() => handleSubmit("send")}>Save and Send</Button>
        <Button variant="ghost">Cancel</Button>
      </div>
    </form>
  );
}
