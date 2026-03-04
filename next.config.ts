import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "swarfarm.com",
        pathname: "/static/**",
      },
    ],
  },
};

export default nextConfig;
