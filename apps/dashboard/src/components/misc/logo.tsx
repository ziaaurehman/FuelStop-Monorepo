import { Fuel } from "lucide-react";
import Link from "next/link";
import React from "react";

interface LogoProps {
  color: string;
}

const Logo: React.FC<LogoProps> = ({ color }) => {
  return (
    <Link href={"/"} className="flex items-center gap-2">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
        <Fuel className="h-5 w-5 text-white" />
      </div>
      <span
        className={`${color === "black" ? "text-black" : "text-white"} text-lg font-semibold `}
      >
        FuelStop
      </span>
    </Link>
  );
};

export default Logo;
