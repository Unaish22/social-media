/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "/**",
      },
    ],
  },

  eslint: {
    ignoreDuringBuilds: true, // 🚀 ESLint errors ko ignore karega
  },

  typescript: {
    ignoreBuildErrors: true, // 🚀 TypeScript errors ignore karega
  },

  experimental: {
    serverActions: {}, // ✅ boolean ke bajaye object
    typedRoutes: false, // 🚀 route params wali strict typing hata dega
  },
};

module.exports = nextConfig;
