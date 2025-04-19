/** @type {import('next').NextConfig} */
const nextConfig = {
<<<<<<< HEAD
    images: {
        domains: ['res.cloudinary.com'],
      },
=======
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'cstrat.com',
      },
    ],
  },
>>>>>>> 8999fa4f1ce873bdbc7d1b6905861913c7404c3a
};

export default nextConfig;
