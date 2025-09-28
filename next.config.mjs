/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,

  // Image optimization for e-commerce product images
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'fakestoreapi.com',
        pathname: '/**',
      },
    ],
  },

  // ESLint configuration
  eslint: {
    ignoreDuringBuilds: false,
  },
}

export default nextConfig
