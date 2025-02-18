import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "ufs.sh",
      "u9a6wmr3as.ufs.sh", // Adicione o subdomínio completo aqui
      "figma.img",
      "s3-alpha-sig.figma.com",
    ],
  },
};

export default nextConfig;
