"use client";

import { Button, Input, Label } from "@repo/components";
import { Mail, Lock } from "lucide-react";
import Link from "next/link";
import Logo from "@/components/misc/logo";

const ResetPage = () => {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-white px-4 font-sans">
      {/* Header */}
      <div className="hidden absolute top-6 right-10  md:flex items-center space-x-2 text-sm">
        <span className="text-gray-500">Don’t have an account?</span>
        <Link href="/signup">
          <Button variant="outline" size="sm" className="font-medium">
            Register
          </Button>
        </Link>
      </div>

      {/* Logo */}
      <div className="absolute md:top-6 md:left-10 top-4 left-4 flex items-center space-x-2">
        <Logo color={"black"} />
      </div>

      {/* Main Card */}
      <div className="w-full max-w-80">
        <div className="flex flex-col items-center space-y-2 mb-10">
          <div className="flex h-16 w-16 items-center justify-center mb-4 rounded-full border border-gray-200 bg-gray-50">
            <Lock color="#a3a3a3" />
          </div>
          <h1 className="text-xl font-semibold">Reset Password</h1>
          <p className="text-sm text-gray-500">
            Enter your Email Address to reset password.
          </p>
        </div>

        <form className="space-y-5">
          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email Address *</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="email"
                type="email"
                placeholder="hello@fuelstop.com"
                className="pl-9"
              />
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-primary hover:bg-[#007780] text-white"
          >
            <Link href={"/verification"}>
              Reset Password
            </Link>
          </Button>
        </form>
        <div className="flex flex-col items-center justify-center space-x-2 text-sm w-full mt-2">
          <span className="text-gray-500">{"Don't have Access Anymore"}</span>
          <Link href="/login">
            <Button variant="outline" size="sm" className="font-medium">
              Try Another Method
            </Button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="absolute md:bottom-6 md:left-10 bottom-4 left-4 flex w-full justify-between text-xs text-gray-400">
        <p>© 2025 FuelStop</p>
        {/* <div className="flex items-center space-x-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3.5 w-3.5 text-gray-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path d="M12 20h9" />
            <path d="M16.5 3a6.5 6.5 0 0 1 0 13H3" />
            <path d="m2 9 3 3-3 3" />
          </svg>
          <span>ENG</span>
        </div> */}
      </footer>
    </div>
  );
};

export default ResetPage;
