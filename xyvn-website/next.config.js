/** @type {import('next').NextConfig} */
const nextConfig = {
  // 移除 output: 'export' 以支持 API Routes 和 Middleware
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '*.supabase.co', // Supabase Storage
      },
    ],
  },
}

module.exports = nextConfig
