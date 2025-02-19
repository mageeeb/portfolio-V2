
import type { NextConfig } from "next";
import {ImageResponse} from "next/server";
import createMDX from "@next/mdx";

const withMDX = createMDX({
    extension: /\.mdx?$/,
});

// const nextConfig: NextConfig = withMDX({
//     reactStrictMode: true,
//     // Déclarez `experimental` explicitement
//     experimental: {
//         appDir: true, // Autorise le dossier `src/app`
//     },
//     pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"], // Supporte les fichiers MDX
// });
//
// export default nextConfig;

const nextConfig = {
    experimental: {
        // Supprimez `appDir` si vous utilisez Next.js 13+
    },
};

module.exports = nextConfig;