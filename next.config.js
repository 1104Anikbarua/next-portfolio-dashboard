/** @type {import('next').NextConfig} */
const nextConfig = {
  // allow image from anysource
  images: {
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
};

module.exports = nextConfig;
