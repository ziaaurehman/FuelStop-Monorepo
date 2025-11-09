"use client";

import { useState } from "react";

import { Button } from "@repo/components";
import { InvoiceData, sampleInvoice } from "@/data";
import { ResponsiveModal } from "@/components/ui";
import { InvoiceDetailModal } from "./invoice-detail";
import { PaymentSuccessModal } from "./payment-success";
import { PaymentFormModal } from "./payment-form";
import { useRouter } from "next/navigation";

type FlowStep = "invoice" | "payment" | "success";

interface InvoicePaymentFlowProps {
  invoice?: InvoiceData;
  trigger?: React.ReactNode;
  onComplete?: () => void;
}

export function InvoicePaymentFlow({
  invoice = sampleInvoice,
  trigger,
  onComplete,
}: InvoicePaymentFlowProps) {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState<FlowStep>("invoice");

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => setCurrentStep("invoice"), 300); // Reset after animation
  };

  const handlePayNow = () => {
    setCurrentStep("payment");
  };

  const handlePaymentSubmit = () => {
    setCurrentStep("success");
  };

  const handleBackToInvoice = () => {
    setCurrentStep("invoice");
  };

  const handleGoHome = () => {
    handleClose();
    if (onComplete) onComplete();
    router.push("/");
  };

  const handleBackToInvoices = () => {
    handleClose();
    if (onComplete) onComplete();
    router.push("/invoices");
  };

  const getModalSize = () => {
    switch (currentStep) {
      case "invoice":
        return "xl" as const;
      case "payment":
        return "md" as const;
      case "success":
        return "md" as const;
      default:
        return "md" as const;
    }
  };

  const getModalTitle = () => {
    switch (currentStep) {
      case "payment":
        return "Payment Details";
      case "success":
        return "";
      default:
        return "";
    }
  };

  return (
    <>
      {/* Trigger Button */}
      {trigger ? (
        <div onClick={() => setIsOpen(true)}>{trigger}</div>
      ) : (
        <Button
          onClick={() => setIsOpen(true)}
          className="bg-primary hover:bg-primary-foreground"
        >
          Pay Now
        </Button>
      )}

      {/* Modal */}
      <ResponsiveModal
        open={isOpen}
        onOpenChange={setIsOpen}
        size={getModalSize()}
        title={getModalTitle()}
        showCloseIcon={false}
        closeOnOverlayClick={currentStep === "success"}
      >
        {currentStep === "invoice" && (
          <InvoiceDetailModal
            invoice={invoice}
            onClose={handleClose}
            onPayNow={handlePayNow}
          />
        )}

        {currentStep === "payment" && (
          <PaymentFormModal
            amount={invoice.balanceDue}
            onSubmit={handlePaymentSubmit}
            onBack={handleBackToInvoice}
          />
        )}

        {currentStep === "success" && (
          <PaymentSuccessModal
            onGoHome={handleGoHome}
            onClose={handleClose}
            onBackToInvoices={handleBackToInvoices}
          />
        )}
      </ResponsiveModal>
    </>
  );
}
