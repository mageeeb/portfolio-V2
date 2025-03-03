import createMDX from "@next/mdx";
import path from "path";

// Ajoutez ici la configuration MDX
const withMDX = createMDX({
    extension: /\.mdx?$/,
});

// Configuration Next.js
const nextConfig = withMDX({
    reactStrictMode: true,
    pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],

    // Configuration Webpack
    webpack: (config) => {
        config.resolve.alias = {
            ...config.resolve.alias,
            react: path.resolve("./node_modules/react"),
            "react/jsx-runtime": path.resolve("./node_modules/react/jsx-runtime"),
        };
        return config;
    },
});

export default nextConfig;