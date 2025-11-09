"use client";

import { useState } from "react";
import { Button, Input, Label } from "@repo/components";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/components";

interface PaymentFormModalProps {
  amount: number;
  onSubmit: () => void;
  onBack: () => void;
}

export function PaymentFormModal({
  amount,
  onSubmit,
}: PaymentFormModalProps) {
  const [paymentMethod, setPaymentMethod] = useState<"card" | "bank">("card");
  const [formData, setFormData] = useState({
    cardNumber: "",
    expirationDate: "",
    securityCode: "",
    country: "United States",
    addressLine1: "",
    addressLine2: "",
    city: "",
    zip: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      {/* Payment Method Tabs */}
      <div className="flex gap-4">
        <button
          onClick={() => setPaymentMethod("card")}
          className={`flex-1 py-3 px-4 rounded-lg border-2 font-medium transition-colors ${
            paymentMethod === "card"
              ? "border-primary bg-primary/5 text-primary"
              : "border-border bg-background text-muted-foreground hover:border-primary/50"
          }`}
        >
          Pay by Card
        </button>
        <button
          onClick={() => setPaymentMethod("bank")}
          className={`flex-1 py-3 px-4 rounded-lg border-2 font-medium transition-colors ${
            paymentMethod === "bank"
              ? "border-primary bg-primary/5 text-primary"
              : "border-border bg-background text-muted-foreground hover:border-primary/50"
          }`}
        >
          Pay by Bank
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Card Number */}
        <div className="space-y-2">
          <Label htmlFor="cardNumber">Card Number</Label>
          <Input
            id="cardNumber"
            placeholder="Input"
            value={formData.cardNumber}
            onChange={(e) => handleChange("cardNumber", e.target.value)}
          />
        </div>

        {/* Expiration and Security */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="expirationDate">Expiration Date</Label>
            <Input
              id="expirationDate"
              placeholder="MM/YY"
              value={formData.expirationDate}
              onChange={(e) => handleChange("expirationDate", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="securityCode">Security Code</Label>
            <Input
              id="securityCode"
              placeholder="CVV"
              value={formData.securityCode}
              onChange={(e) => handleChange("securityCode", e.target.value)}
            />
          </div>
        </div>

        {/* Billing Address */}
        <div className="space-y-2">
          <Label htmlFor="country">Billing Address</Label>
          <Select
            value={formData.country}
            onValueChange={(value) => handleChange("country", value)}
          >
            <SelectTrigger id="country">
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="United States">United States</SelectItem>
              <SelectItem value="Canada">Canada</SelectItem>
              <SelectItem value="United Kingdom">United Kingdom</SelectItem>
              <SelectItem value="Australia">Australia</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Address Line 1 */}
        <div className="space-y-2">
          <Input
            placeholder="Address line"
            value={formData.addressLine1}
            onChange={(e) => handleChange("addressLine1", e.target.value)}
          />
        </div>

        {/* Address Line 2 */}
        <div className="space-y-2">
          <Input
            placeholder="Address line"
            value={formData.addressLine2}
            onChange={(e) => handleChange("addressLine2", e.target.value)}
          />
        </div>

        {/* City and Zip */}
        <div className="grid grid-cols-2 gap-4">
          <Input
            placeholder="City"
            value={formData.city}
            onChange={(e) => handleChange("city", e.target.value)}
          />
          <Input
            placeholder="Zip"
            value={formData.zip}
            onChange={(e) => handleChange("zip", e.target.value)}
          />
        </div>

        {/* Subtotals */}
        <div className="space-y-2 pt-4">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="font-medium">${amount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="font-medium">${amount.toFixed(2)}</span>
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full bg-primary hover:bg-primary-foreground py-6 text-lg font-semibold"
        >
          Pay ${amount.toFixed(2)}
        </Button>
      </form>
    </div>
  );
}
