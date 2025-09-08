/** @type {import('next').NextConfig} */
const nextConfig = {
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
    ],
  },
};

module.exports = nextConfig;
