/** @type {import('next').NextConfig} */
const nextConfig = {
  // async redirects() {
  //   return [
  //     {
  //       source: "/book",
  //       destination: "/booking",
  //       permanent: false,
  //     },
  //     {
  //       source: "/book/cape-town",
  //       destination: "/booking",
  //       permanent: false,
  //     },
  //     {
  //       source: "/booking/cape-town",
  //       destination: "/booking",
  //       permanent: false,
  //     },
  //   ];
  // },
  async rewrites() { return [ { source: "/book", destination: "/booking", }, { source: "/book/cape-town", destination: "/booking", }, { source: "/booking/cape-town", destination: "/booking", }, ]; },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '**',
      },
    ],
  },
};

export default nextConfig;
