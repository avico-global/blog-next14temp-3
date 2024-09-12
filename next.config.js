/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.sitebuilderz.com",
      },
      {
        protocol: "https",
        hostname: "custom-wheels-car-rims.com",
      },
    ],
    domains: ["api.sitebuilderz.com"],
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
