import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gradient-to-b from-gray-100 to-gray-200 px-4 text-center">
      <div className="flex flex-col items-center gap-4">
        {/* Large Error Code */}
        <h1 className="text-9xl font-extrabold text-primary drop-shadow-lg">
          404
        </h1>

        {/* Headline */}
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="text-gray-600 max-w-md">
          We’re sorry, but the page you’re looking for either doesn’t exist or
          was moved.
        </p>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-medium text-white shadow hover:bg-primary/90"
          >
            <ArrowLeft className="h-5 w-5" />
            Go Home
          </Link>
        </div>
      </div>

      {/* Optional Footer */}
      <div className="absolute bottom-4 text-sm text-gray-500">
        Need Help?{" "}
        <Link href="/support" className="underline">
          Contact Support
        </Link>
      </div>
    </div>
  );
}
