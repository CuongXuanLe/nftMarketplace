/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    images: {
      unoptimized: true,
    },
  },
  trailingSlash: true,
  images: {
    formats: ["image/avif", "image/webp"],
    domains: ["gateway.pinata.cloud"],
  },
};

module.exports = nextConfig;
