import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL("https://wpqdz4cue0.ufs.sh/f/**")],
    dangerouslyAllowSVG: true,
  },
  async headers() {
    return [
      {
        source: "/api/testimonials",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
