"use client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/components/ui/card";
import { Button } from "@repo/components";
import { Edit, CheckCircle } from "lucide-react";

export function BillingInfo() {
  const billingData = {
    country: "United Kingdom",
    address: "123 Main St, Downtown",
    city: "London",
    state: "Downtown",
    zipCode: "23232",
    faxNumber: "123 Main St, Downtown",
  };

  const deliveryQuotas = {
    receivables: "5,000 gal",
    usedThisMonth: "3,250 gal",
    remaining: "1,750 gal",
  };

  const contractTerms = {
    startDate: "January 15, 2024",
    endDate: "January 15, 2025",
    autoRenewal: true,
    tier: "Premium",
    creditLimit: "50000",
    specialTerms: "Volume discount: 5% for orders above 1000 gallons",
  };

  return (
    <div className="space-y-6">
      {/* Billing Info Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between flex-wrap gap-2">
            <CardTitle>Billing Info</CardTitle>
            <Button variant="ghost" size="sm" className="text-primary">
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(billingData).map(([key, value]) => (
              <div key={key}>
                <p className="text-sm text-muted-foreground mb-1 capitalize">
                  {key.replace(/([A-Z])/g, " $1")}:
                </p>
                <p className="font-semibold break-words">{value}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Delivery Quotas Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between flex-wrap gap-2">
            <CardTitle className="text-xl">Delivery Quotas</CardTitle>
            <Button variant="ghost" size="sm" className="text-primary">
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {Object.entries(deliveryQuotas).map(([key, value]) => (
              <div key={key} className="bg-muted rounded-lg p-4 text-center">
                <p className="text-sm text-muted-foreground mb-1 capitalize">
                  {key.replace(/([A-Z])/g, " $1")}
                </p>
                <p className="text-2xl font-bold">{value}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Contract Terms Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between flex-wrap gap-2">
            <CardTitle className="text-xl">Contract Terms</CardTitle>
            <Button variant="ghost" size="sm" className="text-primary">
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-muted-foreground mb-1">
                Contract Start Date:
              </p>
              <p className="font-semibold">{contractTerms.startDate}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">
                Contract End Date:
              </p>
              <p className="font-semibold">{contractTerms.endDate}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">
                Auto Renewal:
              </p>
              <div className="flex items-center gap-2 font-semibold">
                <CheckCircle className="h-4 w-4 text-green-600" />
                {contractTerms.autoRenewal ? "Enabled" : "Disabled"}
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">
                Contract Tier:
              </p>
              <p className="font-semibold">{contractTerms.tier}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">
                Credit Limit:
              </p>
              <p className="font-semibold">{contractTerms.creditLimit}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">
                Special Terms:
              </p>
              <p className="font-semibold break-words">
                {contractTerms.specialTerms}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
