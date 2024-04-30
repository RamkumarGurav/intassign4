// const dotenvExpand = require("dotenv-expand");
import dotenvExpand from "dotenv-expand";

dotenvExpand.expand({ parsed: { ...process.env } });

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com/**",
      },
      {
        protocol: "http",
        hostname: "localhost/**",
      },
      {
        protocol: "https",
        hostname: "icon-library.com/**",
      },
      {
        protocol: "https",
        hostname: "www.marswebsolution.com/**",
      },
    ],
  },
};

export default nextConfig;
