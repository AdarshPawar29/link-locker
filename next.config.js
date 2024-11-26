/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  env: {
    NEXT_PUBLIC_TURSO_API_KEY: process.env.NEXT_PUBLIC_TURSO_API_KEY,
    NEXT_PUBLIC_TURSO_DATABASE_URL: process.env.NEXT_PUBLIC_TURSO_DATABASE_URL,
  },
};

module.exports = nextConfig;
