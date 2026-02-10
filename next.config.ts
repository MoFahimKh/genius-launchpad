import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "token-media.defined.fi"
      },
      {
        protocol: "https",
        hostname: "www.tradegenius.com"
      }
    ]
  }
};

export default nextConfig;
