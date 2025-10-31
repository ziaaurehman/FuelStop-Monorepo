"use client";

import { Check } from "lucide-react";
import { cn } from "@repo/components/lib/utils";

interface Step {
  number: number;
  title: string;
  completed: boolean;
}

interface OnboardingProgressProps {
  currentStep: number;
  steps: Step[];
}

export function OnboardingProgress({
  currentStep,
  steps,
}: OnboardingProgressProps) {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center flex-1">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors",
                  step.completed
                    ? "border-primary bg-primary text-white"
                    : currentStep === step.number
                      ? "border-primary bg-primary text-white"
                      : "border-gray-300 bg-white text-gray-500"
                )}
              >
                {step.completed ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <span className="text-sm font-semibold">{step.number}</span>
                )}
              </div>
              <span
                className={cn(
                  "mt-2 hidden text-xs font-medium md:block",
                  currentStep === step.number || step.completed
                    ? "text-gray-900"
                    : "text-gray-500"
                )}
              >
                {step.title}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "mx-2 h-0.5 flex-1 transition-colors",
                  step.completed ? "bg-primary" : "bg-gray-300"
                )}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
