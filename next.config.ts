import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
    'lh3.googleusercontent.com',
    'avatars.githubusercontent.com',
    'res.cloudinary.com',
    'pbs.twimg.com',
  ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '**',
      },
    ],
  },
};

export default nextConfig;
