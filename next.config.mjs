/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ["172.24.0.1", "172.24.0.1:4000", "localhost:4000", "127.0.0.1:4000", "127.0.0.1", "localhost"],
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async rewrites() {
    const backendHost = process.env.BACKEND_HOST || "host.docker.internal"
    const backendPort = process.env.BACKEND_PORT || "8000"
    return [
      {
        source: "/api/backend/:path*",
        destination: `http://${backendHost}:${backendPort}/api/:path*`,
      },
      {
        source: "/api/agri-ai",
        destination: `http://${backendHost}:${backendPort}/api/chat`,
      },
    ]
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ]
  },
}

export default nextConfig
