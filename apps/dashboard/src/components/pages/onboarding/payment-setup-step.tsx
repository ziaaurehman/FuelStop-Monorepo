"use client";

import {
  Button,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  RadioGroup,
  RadioGroupItem,
} from "@repo/components";
import { PaymentSetupData } from "@/lib";
import { useState } from "react";

interface PaymentSetupStepProps {
  data: PaymentSetupData | null;
  onNext: (data: PaymentSetupData) => void;
  onBack: () => void;
}

export function PaymentSetupStep({
  data,
  onNext,
  onBack,
}: PaymentSetupStepProps) {
  const [formData, setFormData] = useState<PaymentSetupData>(
    data || {
      paymentMethod: "credit_card",
      nameOnCard: "",
      cardNumber: "",
      expirationDate: "",
      securityCode: "",
      billingAddress: "",
      city: "",
      country: "",
      state: "",
      zipCode: "",
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext(formData);
  };

  const showCardDetails = formData.paymentMethod === "credit_card";

  return (
    <div className="mx-auto w-full max-w-2xl space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-semibold">
          Payment and Billing Preference
        </h1>
        <p className="text-sm text-gray-500">Operational Integration</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            PREFERRED PAYMENT METHOD
          </p>

          <RadioGroup
            value={formData.paymentMethod}
            onValueChange={(value: string) =>
              setFormData({
                ...formData,
                paymentMethod: value as PaymentSetupData["paymentMethod"],
              })
            }
            className="space-y-3"
          >
            <div className="flex items-center space-x-3 rounded-lg border p-4 cursor-pointer hover:bg-gray-50">
              <RadioGroupItem value="credit_card" id="credit_card" />
              <Label htmlFor="credit_card" className="flex-1 cursor-pointer">
                Credit Card
              </Label>
            </div>

            <div className="flex items-center space-x-3 rounded-lg border p-4 cursor-pointer hover:bg-gray-50">
              <RadioGroupItem value="ach" id="ach" />
              <Label htmlFor="ach" className="flex-1 cursor-pointer">
                ACH (Automated Clearing House)
              </Label>
            </div>

            <div className="flex items-center space-x-3 rounded-lg border p-4 cursor-pointer hover:bg-gray-50">
              <RadioGroupItem value="invoice" id="invoice" />
              <Label htmlFor="invoice" className="flex-1 cursor-pointer">
                Invoice / Net Terms
              </Label>
            </div>

            <div className="flex items-center space-x-3 rounded-lg border p-4 cursor-pointer hover:bg-gray-50">
              <RadioGroupItem value="other" id="other" />
              <Label htmlFor="other" className="flex-1 cursor-pointer">
                Other
              </Label>
            </div>
          </RadioGroup>
        </div>

        {showCardDetails && (
          <>
            <div className="space-y-4">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                CARD DETAILS
              </p>

              <div className="space-y-2">
                <Label htmlFor="nameOnCard">Name on Card</Label>
                <Input
                  id="nameOnCard"
                  placeholder="Enter Name"
                  value={formData.nameOnCard}
                  onChange={(e) =>
                    setFormData({ ...formData, nameOnCard: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input
                  id="cardNumber"
                  placeholder="2222 3333 4444 6666"
                  value={formData.cardNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, cardNumber: e.target.value })
                  }
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expirationDate">Expiration Date</Label>
                  <Input
                    id="expirationDate"
                    placeholder="00/09"
                    value={formData.expirationDate}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        expirationDate: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="securityCode">Security Code (CVC)</Label>
                  <Input
                    id="securityCode"
                    placeholder="123"
                    value={formData.securityCode}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        securityCode: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                BILLING ADDRESS
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="billingAddress">Billing Address</Label>
                  <Input
                    id="billingAddress"
                    placeholder="Enter Your Billing Address"
                    value={formData.billingAddress}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        billingAddress: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Select
                    value={formData.city}
                    onValueChange={(value: string) =>
                      setFormData({ ...formData, city: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select the City" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new-york">New York</SelectItem>
                      <SelectItem value="los-angeles">Los Angeles</SelectItem>
                      <SelectItem value="chicago">Chicago</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  placeholder="Enter the Country Name"
                  value={formData.country}
                  onChange={(e) =>
                    setFormData({ ...formData, country: e.target.value })
                  }
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    placeholder="Enter Your State"
                    value={formData.state}
                    onChange={(e) =>
                      setFormData({ ...formData, state: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="zipCode">Zip Code</Label>
                  <Input
                    id="zipCode"
                    placeholder="Enter Your Zip Code"
                    value={formData.zipCode}
                    onChange={(e) =>
                      setFormData({ ...formData, zipCode: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>
          </>
        )}

        <div className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            className="flex-1"
          >
            Back
          </Button>
          <Button
            type="submit"
            className="flex-1 bg-primary hover:bg-primary-foreground text-white"
          >
            Continue
          </Button>
        </div>
      </form>
    </div>
  );
}
