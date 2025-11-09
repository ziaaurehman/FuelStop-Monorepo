"use client";

import { Badge, Button } from "@repo/components";
import { Download, Printer } from "lucide-react";
import { InvoiceData } from "@/data";

interface InvoiceDetailModalProps {
  invoice: InvoiceData;
  onClose: () => void;
  onPayNow: () => void;
}

export function InvoiceDetailModal({
  invoice,
  onPayNow,
}: InvoiceDetailModalProps) {
  return (
    <div className="relative">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-6 pb-6 border-b gap-4 mt-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            ${invoice.balanceDue.toFixed(2)}
          </h1>
          <p className="text-orange-600 font-medium">Balance Due</p>
        </div>
      </div>

      {/* Invoice Info */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-6 gap-4">
        <div className="flex-1">
          <p className="text-sm text-muted-foreground mb-1">Invoice #</p>
          <p className="font-semibold">{invoice.id}</p>
        </div>
        <div className="flex-1">
          <p className="text-sm text-muted-foreground mb-1">Due Date</p>
          <p className="font-semibold">{invoice.dueDate}</p>
        </div>
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          <Button variant="outline" size="icon">
            <Printer className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
          <Button
            onClick={onPayNow}
            className="bg-primary hover:bg-primary-foreground w-full sm:w-auto"
          >
            Pay Now
          </Button>
        </div>
      </div>

      {/* Invoice Document */}
      <div className="bg-white rounded-lg border p-4 sm:p-8 space-y-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-start justify-between gap-6">
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
              <div className="text-white text-2xl sm:text-3xl">✱</div>
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold">{invoice.clientName}</h2>
              <p className="text-sm text-muted-foreground">
                {invoice.clientAddress}
              </p>
              <p className="text-sm text-muted-foreground">
                {invoice.clientEmail}
              </p>
            </div>
          </div>
          <div className="text-left md:text-right w-full md:w-auto">
            <div className="mb-2">
              <Badge variant="destructive" className="mb-2">
                {invoice.status}
              </Badge>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold">Invoice</h3>
            <p className="text-sm text-muted-foreground">#{invoice.id}</p>
            <div className="mt-4">
              <p className="text-sm font-medium">Balance Due</p>
              <p className="text-2xl sm:text-3xl font-bold">
                ${invoice.balanceDue.toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        {/* Invoice Details */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-4 border-y">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Balance Due:</p>
            <p className="font-semibold">{invoice.dueDate}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Terms:</p>
            <p className="font-semibold">{invoice.terms}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Due Date:</p>
            <p className="font-semibold">{invoice.dueDate}</p>
          </div>
        </div>

        {/* Items Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm sm:text-base">
            <thead>
              <tr className="bg-slate-800 text-white">
                <th className="text-left py-3 px-2 sm:px-4 rounded-tl-lg">#</th>
                <th className="text-left py-3 px-2 sm:px-4">Description</th>
                <th className="text-right py-3 px-2 sm:px-4">QTY</th>
                <th className="text-right py-3 px-2 sm:px-4">Rate</th>
                <th className="text-right py-3 px-2 sm:px-4 rounded-tr-lg">Amount</th>
              </tr>
            </thead>
            <tbody>
              {invoice.items.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="py-3 px-2 sm:px-4">{index + 1}</td>
                  <td className="py-3 px-2 sm:px-4">{item.description}</td>
                  <td className="text-right py-3 px-2 sm:px-4">{item.quantity}</td>
                  <td className="text-right py-3 px-2 sm:px-4">
                    {item.rate.toLocaleString()}
                  </td>
                  <td className="text-right py-3 px-2 sm:px-4 font-medium">
                    ${item.amount.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="flex justify-end">
          <div className="w-full sm:w-64 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Sub Total</span>
              <span className="font-medium">
                ${invoice.subtotal.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Sub Total</span>
              <span className="font-medium">
                ${invoice.subtotal.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between pt-2 border-t font-bold">
              <span>Balance Due</span>
              <span>${invoice.balanceDue.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Notes */}
        <div className="pt-4">
          <h4 className="font-semibold mb-2">Notes</h4>
          <div className="text-sm text-muted-foreground space-y-1">
            <p>{invoice.notes.paymentTo}</p>
            <p>Bank: {invoice.notes.bank}</p>
            <p>Account No: {invoice.notes.accountNo}</p>
            <p>SWIFT: {invoice.notes.swift}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
