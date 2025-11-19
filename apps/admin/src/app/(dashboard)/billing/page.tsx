import {
  AppHeader,
  HeaderActions,
  BillingStatsGrid,
  Invoices,
  Payments,
  TotalProfit,
  PaymentMethods,
  NewInvoiceForm,
} from "@/components";
import {
  Button,
  ResponsiveModal,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/components";
import { Plus } from "lucide-react";

export default function BillingPage() {
  const timeRange = "12";

  return (
    <div>
      <AppHeader
        headerActions={
          <HeaderActions
            customModal={
              <ResponsiveModal
                trigger={
                  <Button className="gap-2 ">
                    <Plus className="h-4 w-4" />
                    <span className="hidden md:block">New Invoice</span>
                  </Button>
                }
                title="New Invoice"
                description="Create a New Invoice"
                size="xl"
              >
                <NewInvoiceForm />
              </ResponsiveModal>
            }
          />
        }
      />
      <div className="md:p-8 p-4 space-y-4 ">
        <BillingStatsGrid />

        <Tabs defaultValue="invoices">
          <TabsList>
            <TabsTrigger value="invoices">Invoices</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>
          <TabsContent value="invoices">
            <Invoices />
          </TabsContent>
          <TabsContent value="payments">
            <Payments />
          </TabsContent>
          <TabsContent value="reports">
            <div className="grid gap-6 lg:grid-cols-3 grid-cols-1">
              {/* Fuel Consumption Chart - 2 columns */}
              <div className="lg:col-span-2">
                <TotalProfit timeRange={timeRange} />
              </div>

              {/* Efficiency Insights - 1 column */}
              <div className="lg:col-span-1">
                <PaymentMethods />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
