"use client";

import { Button, Input, Label } from "@repo/components";
import { CompanyInfoData } from "@/lib";
import { useState } from "react";

interface CompanyInfoStepProps {
  data: CompanyInfoData | null;
  onNext: (data: CompanyInfoData) => void;
}

export function CompanyInfoStep({ data, onNext }: CompanyInfoStepProps) {
  const [formData, setFormData] = useState<CompanyInfoData>(
    data || {
      industryType: "",
      companyName: "",
      primaryContact: "",
      emailAddress: "",
      phoneNumber: "",
      businessAddress: "",
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext(formData);
  };

  return (
    <div className="mx-auto w-full max-w-2xl space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-semibold">
          Company and Contact Information
        </h1>
        <p className="text-sm text-gray-500">
          Basic identification details for your company
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            BASIC INFORMATION
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="industryType">
                Industry Type <span className="text-red-500">*</span>
              </Label>
              <Input
                id="industryType"
                placeholder="Enter Industry Type"
                value={formData.industryType}
                onChange={(e) =>
                  setFormData({ ...formData, industryType: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="companyName">
                Company Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="companyName"
                placeholder="Enter Company Name"
                value={formData.companyName}
                onChange={(e) =>
                  setFormData({ ...formData, companyName: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="primaryContact">
                Primary Contact <span className="text-red-500">*</span>
              </Label>
              <Input
                id="primaryContact"
                placeholder="Enter Primary Contact"
                value={formData.primaryContact}
                onChange={(e) =>
                  setFormData({ ...formData, primaryContact: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="emailAddress">
                Email Address <span className="text-red-500">*</span>
              </Label>
              <Input
                id="emailAddress"
                type="email"
                placeholder="Enter Email Address"
                value={formData.emailAddress}
                onChange={(e) =>
                  setFormData({ ...formData, emailAddress: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phoneNumber">
              Phone Number <span className="text-red-500">*</span>
            </Label>
            <Input
              id="phoneNumber"
              placeholder="Enter Phone Number"
              value={formData.phoneNumber}
              onChange={(e) =>
                setFormData({ ...formData, phoneNumber: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="businessAddress">
              Business Address <span className="text-red-500">*</span>
            </Label>
            <Input
              id="businessAddress"
              placeholder="Enter Business Address"
              value={formData.businessAddress}
              onChange={(e) =>
                setFormData({ ...formData, businessAddress: e.target.value })
              }
              required
            />
          </div>
        </div>

        <Button
          type="submit"
          className="w-full bg-primary hover:bg-primary-foreground text-white"
        >
          Continue
        </Button>
      </form>
    </div>
  );
}
