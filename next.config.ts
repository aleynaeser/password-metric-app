import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  resolve: {
    fallback: {
      fs: false,
    },
  },
};

export default nextConfig;
