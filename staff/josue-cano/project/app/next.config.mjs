/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ hostname: "localhost" }],
  },
  //coloca un / al final d elas rutas
  trailingSlash: true,
};

export default nextConfig;
