import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  transpilePackages: ["rc-util", "rc-picker"],
  compiler: {
    styledComponents: true,
  },
};

export default nextConfig;
