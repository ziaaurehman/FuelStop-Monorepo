import { z } from "zod";

export const companyInfoSchema = z.object({
  industryType: z.string().min(1, "Industry type is required"),
  companyName: z.string().min(1, "Company name is required"),
  primaryContact: z.string().min(1, "Primary contact is required"),
  emailAddress: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  businessAddress: z.string().min(1, "Business address is required"),
});

export const locationSchema = z.object({
  locations: z
    .array(
      z.object({
        id: z.string(),
        name: z.string().min(1, "Location name is required"),
      })
    )
    .min(1, "At least one location is required"),
});

export const vehicleDetailsSchema = z.object({
  fleetSize: z.string().min(1, "Fleet size is required"),
  existingSystem: z.string().optional(),
  vehicles: z
    .array(
      z.object({
        id: z.string(),
        vehicleId: z.string().min(1, "Vehicle ID is required"),
        fuelType: z.string().min(1, "Fuel type is required"),
        tankSize: z.string().min(1, "Tank size is required"),
        parkedLocation: z.string().min(1, "Parked location is required"),
      })
    )
    .min(1, "At least one vehicle is required"),
});

export const paymentSetupSchema = z.object({
  paymentMethod: z.enum(["credit_card", "ach", "invoice", "other"]),
  nameOnCard: z.string().optional(),
  cardNumber: z.string().optional(),
  expirationDate: z.string().optional(),
  securityCode: z.string().optional(),
  billingAddress: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  state: z.string().optional(),
  zipCode: z.string().optional(),
});

export type CompanyInfoData = z.infer<typeof companyInfoSchema>;
export type LocationData = z.infer<typeof locationSchema>;
export type VehicleDetailsData = z.infer<typeof vehicleDetailsSchema>;
export type PaymentSetupData = z.infer<typeof paymentSetupSchema>;

export interface OnboardingData {
  companyInfo: CompanyInfoData | null;
  locations: LocationData | null;
  vehicleDetails: VehicleDetailsData | null;
  paymentSetup: PaymentSetupData | null;
}