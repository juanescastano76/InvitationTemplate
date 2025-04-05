import { NextConfig } from "next";

// next.config.js
const nextConfig: NextConfig = {
  experimental: {
    turbo: {
      resolveAlias: {
        "@/*": ["./*"],
      },
    },
    serverActions: true,
  },
};

module.exports = nextConfig;
