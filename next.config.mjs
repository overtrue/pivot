import { withContentCollections } from "@content-collections/next"

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // optimizeCss: true, // 临时禁用以解决启动问题
  },
  images: {
    domains: ["localhost", "pivotkit.vercel.app"],
  },
  async redirects() {
    return [
      {
        source: "/components",
        destination: "/docs/components/status-code",
        permanent: true,
      },
      {
        source: "/components/:path*",
        destination: "/docs/components/:path*",
        permanent: true,
      },
      {
        source: "/docs/components",
        destination: "/docs/components/status-code",
        permanent: true,
      },
      {
        source: "/r/:path([^.]*)",
        destination: "/r/:path.json",
        permanent: true,
      },
    ]
  },
}

// withContentCollections must be the outermost plugin
export default withContentCollections(nextConfig)
