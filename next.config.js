/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fix chunk loading errors
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },
  
  // Optimize chunk splitting
  experimental: {
    optimizePackageImports: ['@radix-ui/react-slot', '@radix-ui/react-dialog'],
  },
  
  // Improve hydration
  reactStrictMode: false, // Disable strict mode to prevent double hydration

  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
  
  // Improve development experience
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
};

module.exports = nextConfig;