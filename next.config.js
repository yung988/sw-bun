/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000'],
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hoirqrkdgbmvpwutwuwj.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'omf77i7evqckneoq.public.blob.vercel-storage.com',
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: false,
  },
};

module.exports = nextConfig;