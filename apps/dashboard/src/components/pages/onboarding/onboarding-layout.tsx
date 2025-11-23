"use client";

import Logo from "@repo/components/shared/logo";
import { Button } from "@repo/components";

interface OnboardingLayoutProps {
  children: React.ReactNode;
  showSkip?: boolean;
  onSkip?: () => void;
}

export function OnboardingLayout({
  children,
  showSkip = false,
  onSkip,
}: OnboardingLayoutProps) {
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-white font-sans">
      {/* Logo */}
      <div className="absolute top-4 left-4 md:top-6 md:left-10">
        <Logo color="black" />
      </div>

      {/* Skip Button */}
      {showSkip && (
        <div className="absolute top-4 right-4 md:top-6 md:right-10">
          <div className="flex items-center space-x-2 text-sm">
            <span className="text-gray-500">Want to set up later?</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={onSkip}
              className="font-medium"
            >
              Skip
            </Button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex flex-1 flex-col items-center justify-center px-4 py-20">
        {children}
      </main>

      {/* Footer */}
      <footer className="absolute bottom-4 left-4 md:bottom-6 md:left-10">
        <div className="flex items-center justify-between text-xs text-gray-400">
          <p>© 2025 Fuelstop</p>
        </div>
      </footer>

      {/* Language Selector (Optional) */}
      <div className="absolute bottom-4 right-4 md:bottom-6 md:right-10">
        <Button variant="ghost" size="sm" className="text-xs text-gray-400">
          🌐 ENG
        </Button>
      </div>
    </div>
  );
}
