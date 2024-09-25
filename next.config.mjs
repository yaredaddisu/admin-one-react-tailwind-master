/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  // No redirects required, so we remove the redirects function
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.justboil.me',
      },
    ],
  },
};

export default nextConfig;
