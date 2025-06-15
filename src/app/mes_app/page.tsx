import React from "react";
import { Heading, Flex, Text, Avatar, RevealFx, Column } from "@/once-ui/components";
import { baseURL } from "@/app/resources";
import { mes_app, person } from "@/app/resources/content";
import { ProjectCard } from "@/components";

export async function generateMetadata() {
  const title = mes_app.title;
  const description = mes_app.description;
  const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://${baseURL}/mes_app`,
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

export default function MesApplications() {
  return (
    <Column maxWidth="m" gap="xl" horizontal="center">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: mes_app.title,
            description: mes_app.description,
            url: `https://${baseURL}/mes_app`,
            image: `${baseURL}/og?title=${encodeURIComponent(mes_app.title)}`,
            publisher: {
              "@type": "Person",
              name: person.name,
              image: {
                "@type": "ImageObject",
                url: `${baseURL}${person.avatar}`,
              },
            },
          }),
        }}
      />

      {/* Header Section with Avatar and Description */}
      <Column fillWidth paddingY="l" gap="m">
        <Flex horizontal="center" paddingBottom="l">
          <Avatar src={person.avatar} size="xl" />
        </Flex>
        <Column maxWidth="s" horizontal="center">
          <RevealFx translateY="4" fillWidth horizontal="center" paddingBottom="m">
            <Heading wrap="balance" variant="display-strong-l" align="center">
              {mes_app.title}
            </Heading>
          </RevealFx>
          <RevealFx translateY="8" delay={0.2} fillWidth horizontal="center" paddingBottom="l">
            <Text wrap="balance" onBackground="neutral-weak" variant="heading-default-xl" align="center">
              {mes_app.description}
            </Text>
          </RevealFx>
        </Column>
      </Column>

      {/* Applications Cards */}
      <Column gap="xl" paddingBottom="xl">
        {mes_app.applications.map((app, index) => (
          <RevealFx key={index} translateY="16" delay={0.3 + index * 0.1}>
            <ProjectCard
              href={app.link}
              images={app.images}
              title={app.title}
              content={app.content}
              description={app.description}
              avatars={app.avatars}
              link={app.link}
            />
          </RevealFx>
        ))}
      </Column>
    </Column>
  );
}
