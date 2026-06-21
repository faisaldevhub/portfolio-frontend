import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebrick-vulture-540590.hostingersite.com",
      },
    ],
  },
};

export default nextConfig;
