"use client";

import { Button } from "@repo/components";
import { CheckCircle2 } from "lucide-react";

interface PaymentSuccessModalProps {
  onGoHome: () => void;
  onBackToInvoices: () => void;
  onClose: () => void;
}

export function PaymentSuccessModal({
  onGoHome,
  onClose,
}: PaymentSuccessModalProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-6">
      {/* Success Icon */}
      <div className="relative mt-8">
        <div className="w-32 h-32 rounded-full bg-teal-500 flex items-center justify-center ">
          <CheckCircle2 className="w-16 h-16 text-white" strokeWidth={3} />
        </div>
        {/* Decorative elements */}
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-teal-400 rounded-full opacity-50" />
        <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-teal-400 rounded-full opacity-50" />
      </div>

      {/* Success Message */}
      <div className="space-y-3 max-w-md">
        <h2 className="text-3xl font-bold">Your Payment is Successful</h2>
        <p className="text-muted-foreground">
          Thanks for your payment for Standard Delivery. It will take 3-5 days
          normally Standard Delivery.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 w-full max-w-md pt-4">
        <Button
          variant="outline"
          onClick={onGoHome}
          className="flex-1 py-6 text-base"
        >
          Go Home
        </Button>
        <Button
          onClick={onClose}
          className="flex-1 py-6 text-base bg-primary hover:bg-primary-foreground"
        >
          Back to Invoices
        </Button>
      </div>
    </div>
  );
}
