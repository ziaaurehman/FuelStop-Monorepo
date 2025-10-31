import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages: ["@repo/components", "@repo/ui"],
};

export default nextConfig;
