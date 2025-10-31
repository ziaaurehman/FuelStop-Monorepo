"use client";

import { Button } from "@repo/components";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";

export function CompletedStep() {
  const router = useRouter();

  const handleOpenDashboard = () => {
    router.push("/");
  };

  return (
    <div className="mx-auto flex min-h-[60vh] w-full max-w-2xl flex-col items-center justify-center space-y-6 text-center">
      <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-primary">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary">
          <Check className="h-12 w-12 text-white" strokeWidth={3} />
        </div>
      </div>

      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">Onboarding Completed</h1>
        <p className="text-sm text-gray-500 max-w-md">
          You successfully completed your onboarding. Let{"'"}s manage everything in
          one page by our feulstop dashboard
        </p>
      </div>

      <Button
        onClick={handleOpenDashboard}
        className="w-full max-w-md bg-primary hover:bg-primary-foreground text-white"
      >
        Open Dashboard
      </Button>
    </div>
  );
}
