/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["*"], // This will not work directly
    unoptimized: true, // This will prevent optimization
  },
};

export default nextConfig;
