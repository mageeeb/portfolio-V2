import { notFound } from "next/navigation";
import { CustomMDX } from "@/components/mdx";
import { getPosts } from "@/app/utils/utils";
import { AvatarGroup } from "@/once-ui/components/AvatarGroup";
import { Button } from "@/once-ui/components/Button";
import { Column } from "@/once-ui/components/Column";
import { Flex } from "@/once-ui/components/Flex";
import { Heading } from "@/once-ui/components/Heading";
import { SmartImage } from "@/once-ui/components/SmartImage";
import { Text } from "@/once-ui/components/Text";
import { baseURL } from "@/app/resources";
import { person } from "@/app/resources/content";
import { formatDate } from "@/app/utils/formatDate";
import ScrollToHash from "@/components/ScrollToHash";

// ✅ Ne PAS définir d'interface custom qui casse les types

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const posts = getPosts(["src", "app", "work", "projects"]);
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// ✅ Utiliser type inline pour éviter les erreurs de contrainte
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  const post = getPosts(["src", "app", "work", "projects"]).find((post) => post.slug === slug);

  if (!post) return;

  const {
    title,
    publishedAt: publishedTime,
    summary: description,
    images,
    image,
    team,
  } = post.metadata;

  const ogImage = image
      ? `https://${baseURL}${image}`
      : `https://${baseURL}/og?title=${title}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `https://${baseURL}/work/${post.slug}`,
      images: [{ url: ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

// ✅ Fonction principale du composant
export default async function Project({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  const posts = getPosts(["src", "app", "work", "projects"]);
  const post = posts.find((post) => post.slug === slug);

  if (!post) {
    notFound();
  }

  const avatars =
      post.metadata.team?.map((person) => ({
        src: person.avatar,
      })) || [];

  return (
      <Column as="section" maxWidth="m" horizontal="center" gap="l">
        <script
            type="application/ld+json"
            suppressHydrationWarning
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "BlogPosting",
                headline: post.metadata.title,
                datePublished: post.metadata.publishedAt,
                dateModified: post.metadata.publishedAt,
                description: post.metadata.summary,
                image: post.metadata.image
                    ? `https://${baseURL}${post.metadata.image}`
                    : `https://${baseURL}/og?title=${post.metadata.title}`,
                url: `https://${baseURL}/work/${post.slug}`,
                author: {
                  "@type": "Person",
                  name: person.name,
                },
              }),
            }}
        />
        <Column maxWidth="xs" gap="16">
          <Button href="/work" variant="tertiary" weight="default" size="s" prefixIcon="chevronLeft">
            Projects
          </Button>
          <Heading variant="display-strong-s">{post.metadata.title}</Heading>
        </Column>
        {post.metadata.images.length > 0 && (
            <SmartImage
                priority
                aspectRatio="16 / 9"
                radius="m"
                alt="image"
                src={post.metadata.images[0]}
            />
        )}
        <Column style={{ margin: "auto" }} as="article" maxWidth="xs">
          <Flex gap="12" marginBottom="24" vertical="center">
            {post.metadata.team && <AvatarGroup reverse avatars={avatars} size="m" />}
            <Text variant="body-default-s" onBackground="neutral-weak">
              {formatDate(post.metadata.publishedAt)}
            </Text>
          </Flex>
          <CustomMDX source={post.content} />
        </Column>
        <ScrollToHash />
      </Column>
  );
}