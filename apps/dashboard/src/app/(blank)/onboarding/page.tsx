"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import type {
  OnboardingData,
  CompanyInfoData,
  LocationData,
  VehicleDetailsData,
  PaymentSetupData,
} from "@/lib";
import {
  CompanyInfoStep,
  CompletedStep,
  LocationsStep,
  OnboardingLayout,
  OnboardingProgress,
  PaymentSetupStep,
  VehicleDetailsStep,
} from "@/components";

const STEPS = [
  { number: 1, title: "Company Info", completed: false },
  { number: 2, title: "Locations", completed: false },
  { number: 3, title: "Vehicle Details", completed: false },
  { number: 4, title: "Payment Setup", completed: false },
  { number: 5, title: "Completed", completed: false },
];

const OnboardingPage = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    companyInfo: null,
    locations: null,
    vehicleDetails: null,
    paymentSetup: null,
  });

  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const handleSkip = () => {
    router.push("/");
  };

  const handleCompanyInfoNext = (data: CompanyInfoData) => {
    setOnboardingData({ ...onboardingData, companyInfo: data });
    setCompletedSteps([...completedSteps, 1]);
    setCurrentStep(2);
  };

  const handleLocationsNext = (data: LocationData) => {
    setOnboardingData({ ...onboardingData, locations: data });
    setCompletedSteps([...completedSteps, 2]);
    setCurrentStep(3);
  };

  const handleVehicleDetailsNext = (data: VehicleDetailsData) => {
    setOnboardingData({ ...onboardingData, vehicleDetails: data });
    setCompletedSteps([...completedSteps, 3]);
    setCurrentStep(4);
  };

  const handlePaymentSetupNext = (data: PaymentSetupData) => {
    setOnboardingData({ ...onboardingData, paymentSetup: data });
    setCompletedSteps([...completedSteps, 4]);
    setCurrentStep(5);

    // Here you would typically send all the data to your backend
    console.log("Complete Onboarding Data:", {
      ...onboardingData,
      paymentSetup: data,
    });
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

  const getStepsWithStatus = () => {
    return STEPS.map((step) => ({
      ...step,
      completed: completedSteps.includes(step.number),
    }));
  };

  const locationNames =
    onboardingData.locations?.locations
      .map((loc) => loc.name)
      .filter(Boolean) || [];

  return (
    <OnboardingLayout showSkip={currentStep < 5} onSkip={handleSkip}>
      {currentStep < 5 && (
        <OnboardingProgress
          currentStep={currentStep}
          steps={getStepsWithStatus()}
        />
      )}

      <div className="w-full max-w-4xl px-4 py-8">
        {currentStep === 1 && (
          <CompanyInfoStep
            data={onboardingData.companyInfo}
            onNext={handleCompanyInfoNext}
          />
        )}

        {currentStep === 2 && (
          <LocationsStep
            data={onboardingData.locations}
            onNext={handleLocationsNext}
            onBack={handleBack}
          />
        )}

        {currentStep === 3 && (
          <VehicleDetailsStep
            data={onboardingData.vehicleDetails}
            locations={locationNames}
            onNext={handleVehicleDetailsNext}
            onBack={handleBack}
          />
        )}

        {currentStep === 4 && (
          <PaymentSetupStep
            data={onboardingData.paymentSetup}
            onNext={handlePaymentSetupNext}
            onBack={handleBack}
          />
        )}

        {currentStep === 5 && <CompletedStep />}
      </div>
    </OnboardingLayout>
  );
};

export default OnboardingPage;
