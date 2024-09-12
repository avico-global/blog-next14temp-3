/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.sitebuilderz.com",
      },
    ],
    domains: ["api.sitebuilderz.com"],
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
