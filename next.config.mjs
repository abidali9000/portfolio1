/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      // Allow Supabase Storage public URLs from any project ref.
      { protocol: "https", hostname: "*.supabase.co", pathname: "/storage/v1/object/public/**" },
    ],
  },
  experimental: {
    serverActions: {
      // Default is 1 MB; bump to 10 MB so common image uploads work.
      bodySizeLimit: "10mb",
    },
  },
}

export default nextConfig
