import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@repo/components", "@repo/ui"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
      },
      {
        protocol: "https",
        hostname: "1000logos.net",
      },
      {
        protocol: "https",
        hostname: " api.dicebear.com",
      },
     
    ],
  },
};

export default nextConfig;
