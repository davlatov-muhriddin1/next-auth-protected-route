import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true, // ESLint xatolarini build jarayonida e'tiborsiz qoldiradi
  },
};

export default nextConfig;
