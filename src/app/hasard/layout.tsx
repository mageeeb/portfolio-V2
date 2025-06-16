import React from "react";
import { baseURL } from "@/app/resources";

export async function generateMetadata() {
  const title = "Hasard";
  const description = "Application pour sélectionner aléatoirement 2 groupes d'élèves";
  const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://${baseURL}/hasard`,
      images: [
        {
          url: ogImage,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

interface HasardLayoutProps {
  children: React.ReactNode;
}

export default function HasardLayout({ children }: HasardLayoutProps) {
  return children;
}
