import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
};

export default nextConfig;

module.exports = {
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true,
  },
};
