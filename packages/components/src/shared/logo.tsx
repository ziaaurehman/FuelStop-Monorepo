"use client";
import React from "react";
import { LogoIcon } from "./logo-icon";
import { LogoText } from "./logo-text";

interface LogoProps {
  color: "black" | "white";
}

const Logo: React.FC<LogoProps> = ({ color }) => {
  const textColor = color === "black" ? "#000" : "#fff";
  return (
    <div className="flex items-center md:gap-4 gap-2 min-w-0">
      <div className="flex h-8 w-8 lg:h-[36px] lg:w-[36px] flex-shrink-0 items-center justify-center rounded-lg bg-primary">
        <LogoIcon color="white" background="transparent" />
      </div>
      <span className={`  overflow-hidden mt-1.5`}>
        <LogoText
          color={textColor}
          width={window.innerWidth < 1024 ? 90 : 100}
          height={24}
        />
      </span>
    </div>
  );
};

export default Logo;
