import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL("https://wpqdz4cue0.ufs.sh/f/**")],
  },
};

export default nextConfig;
