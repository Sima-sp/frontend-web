/** @type {import('next').NextConfig} */
const nextConfig = {
  // Gera HTML estático em out/: hospeda em qualquer lugar (GitHub Pages, Netlify, Vercel ou o próprio Spring).
  output: "export",
  // Publicada numa subpasta (GitHub Pages em https://sima-sp.github.io/frontend-web/), a página
  // precisa saber disso para achar os próprios arquivos. O fluxo de publicação define a variável.
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
  images: { unoptimized: true },
  reactStrictMode: true,
};
export default nextConfig;
