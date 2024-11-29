/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ hostname: "img.daisyui.com" }],
  },
  //coloca un / al final d elas rutas 
  trailingSlash: true,
};

export default nextConfig;
