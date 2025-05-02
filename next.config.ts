// next.config.js

/** @type {import('next').NextConfig} */
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["next-themes"],
  reactStrictMode: true,

  images: {
    // Use remotePatterns instead of domains
    remotePatterns: [
      {
        protocol: 'https', // Allow images served over HTTPS
        hostname: 'images.unsplash.com', // Specify the allowed hostname
        port: '', // Usually empty unless a specific port is needed
        pathname: '/**', // Allow any path on this hostname (most common)
        // You could restrict pathnames if needed, e.g., '/photo-**'
      },
      // Add other patterns here if needed for other domains
      // { protocol: 'https', hostname: 'your-cdn.com', ... },
    ],
  },
};

export default nextConfig;