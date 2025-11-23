"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/components";
import { useInvoicesStore } from "@/stores/invoices-store";
import { InvoicesTable } from "./invoices-table";
import { PaymentsTable } from "./payments-table";

export function InvoicesTabs() {
  const { activeTab, setActiveTab } = useInvoicesStore();

  return (
    <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "invoices" | "payments")}>
      <TabsList>
        <TabsTrigger value="invoices">Invoices</TabsTrigger>
        <TabsTrigger value="payments">Payments</TabsTrigger>
      </TabsList>
      <TabsContent value="invoices">
        <InvoicesTable />
      </TabsContent>
      <TabsContent value="payments">
        <PaymentsTable />
      </TabsContent>
    </Tabs>
  );
}

