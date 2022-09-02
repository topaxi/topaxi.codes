const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  experimental: {
    serverComponents: false,
  },

  async rewrites() {
    return Promise.resolve({
      beforeFiles: [],
      afterFiles: [
        {
          source: "/sitemap.xml",
          destination: "/api/sitemap",
        },
        {
          source: "/sitemap/:type.xml",
          destination: "/api/sitemap/:type",
        },
      ],
      fallback: [],
    });
  },
};

module.exports = withBundleAnalyzer(nextConfig);
