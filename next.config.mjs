/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    domains: ['lh3.googleusercontent.com', 'avatars.githubusercontent.com'],
  },
  basePath: '/laura',
  assetPrefix: '/laura',
  trailingSlash: true,

  // Disable TypeScript and ESLint checks during build
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Configure static export
  distDir: 'out',

  // Skip API routes during static export
  skipApiRoutes: true,

  experimental: {
    missingSuspenseWithCSRBailout: true
  },

  reactStrictMode: false,

  // Ignore specific page extensions
  pageExtensions: ["tsx", "ts", "jsx", "js"].filter(
    (ext) => !ext.includes("spec")
  ),

  // Configure webpack
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Ignore all files in api directory during client-side compilation
      config.module.rules.push({
        test: /app\/api\/.+/,
        loader: 'ignore-loader'
      });
    }
    return config;
  },

  // Suppress specific console warnings
  onDemandEntries: {
    // Reduce console noise
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
};

export default nextConfig;
