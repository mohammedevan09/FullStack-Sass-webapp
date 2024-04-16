/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      '',
      '*',
      'localhost',
      'res.cloudinary.com',
      'res-console.cloudinary.com',
      'lh3.googleusercontent.com',
      'avatars.githubusercontent.com',
    ],
  },
}

module.exports = nextConfig
