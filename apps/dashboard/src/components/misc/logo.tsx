import { Fuel } from "lucide-react";
import Link from "next/link";
import React from "react";

interface LogoProps {
  color: "black" | "white";
}

const Logo: React.FC<LogoProps> = ({ color }) => {
  return (
    <Link href={"/"} className="flex items-center gap-2 min-w-0">
      <div className="flex h-8 w-8 lg:h-10 lg:w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary">
        <Fuel className="h-5 w-5 text-white" />
      </div>
      <span
        className={`${
          color === "black" ? "text-black" : "text-white"
        } text-lg xl:text-xl font-semibold whitespace-nowrap overflow-hidden text-ellipsis`}
      >
        FuelStop
      </span>
    </Link>
  );
};

export default Logo;
