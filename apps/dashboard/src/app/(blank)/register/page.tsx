"use client";

import { Button, Input, Label } from "@repo/components";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  UserRoundPlus,
  UserRound,
  Info,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import Logo from "@/components/misc/logo";

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-white px-4 font-sans">
      {/* Header */}
      <div className="hidden absolute top-6 right-10  md:flex items-center space-x-2 text-sm">
        <span className="text-gray-500">Already have an account?</span>
        <Link href="/login">
          <Button variant="outline" size="sm" className="font-medium">
            Login
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
            <UserRoundPlus color="#a3a3a3" />
          </div>
          <h1 className="text-xl font-semibold">Login to your account</h1>
          <p className="text-sm text-gray-500">Enter your details to Register.</p>
        </div>

        <form className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name *</Label>
            <div className="relative">
              <UserRound className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="name"
                type="text"
                placeholder="Enter Your Full Name"
                className="pl-9"
              />
            </div>
          </div>

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

          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="password">Password *</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••••"
                className="pl-9 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Info className="text-blue-600 w-4 h-4"/>
            <p className="text-xs">
              Must Contain one Uppercase Letter, 1 number, min 8 Characters.
            </p>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-primary hover:bg-[#007780] text-white"
          >
            Register
          </Button>
        </form>
        <div className="flex md:hidden items-center justify-center space-x-2 text-sm w-full mt-2">
          <span className="text-gray-500">Already have an account?</span>
          <Link href="/login">
            <Button variant="outline" size="sm" className="font-medium">
              Login
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
export default RegisterPage;
