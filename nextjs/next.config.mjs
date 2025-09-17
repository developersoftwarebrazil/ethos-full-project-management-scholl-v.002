/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    after: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "http",
        hostname: "host.docker.internal",
        port: "9000",
        pathname: "/media/uploads/thumbnails/**",
      },
      {
        protocol: "http",
        hostname: "host.docker.internal",
        port: "9000",
        pathname: "/media/uploads/users/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
    ],
  },
};

export default nextConfig;
