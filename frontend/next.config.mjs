//import type { NextConfig } from "next";
// import { nextConfig } from "next";

const nextConfig = {
  /* config options here */
  reactStrictMode: true,
  transpilePackages: ["rc-util", "rc-picker"],
  compiler: {
    styledComponents: true,
  },
};

export default nextConfig;

// module.exports = {
//   compiler: {
//     // Enables the styled-components SWC transform
//     styledComponents: true,
//   },
// };
