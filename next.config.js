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
        hostname: "www.custom-wheels-car-rims.com",
      },
      {
        protocol: "https",
        hostname: "custom-wheels-car-rims.com",
      },
    ],
    domains: [
      "api.sitebuilderz.com",
      "www.custom-wheels-car-rims.com",
      "custom-wheels-car-rims.com",
    ],
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
