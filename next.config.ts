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
      },
      {
        protocol: "https",
        hostname: "ipfs.io"
      },
      {
        protocol: "https",
        hostname: "desperate-moccasin-minnow.myfilebase.com"
      }
    ]
  }
};

export default nextConfig;
