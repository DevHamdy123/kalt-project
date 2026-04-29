/** @type {import('next').NextConfig} */
const nextConfig = {
  // الحركة دي هي اللي هتحل إيرور التيرمينال
  allowedDevOrigins: ["192.168.1.5:3000"],

  images: {
    qualities: [75, 100],
  },
};

export default nextConfig;
