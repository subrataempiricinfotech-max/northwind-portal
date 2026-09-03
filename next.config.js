/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: {
      allowedOrigins: ["northwind.example.com"]
    }
  }
};

module.exports = nextConfig;
