import { notFound } from "next/navigation";
import { getPosts } from "@/app/utils/utils";
import { CustomMDX } from "@/components/mdx";
import { BlogImageEnhancer } from "@/components/blog/BlogImageEnhancer";
import { AvatarGroup } from "@/once-ui/components/AvatarGroup";
import { Button } from "@/once-ui/components/Button";
import { Column } from "@/once-ui/components/Column";
import { Heading } from "@/once-ui/components/Heading";
import { Row } from "@/once-ui/components/Row";
import { Text } from "@/once-ui/components/Text";
import { baseURL } from "@/app/resources";
import { person } from "@/app/resources/content";
import { formatDate } from "@/app/utils/formatDate";
import ScrollToHash from "@/components/ScrollToHash";

interface Params {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
    const posts = await getPosts(["src", "app", "blog", "posts"]);
    return posts.map((post) => ({ slug: post.slug }));
}
export async function generateMetadata({ params }: Params) {
    const awaitedParams = await params;
    const slug = awaitedParams.slug;
    const posts = await getPosts(["src", "app", "blog", "posts"]);
    const post = posts.find((p) => p.slug === slug);
    if (!post) return notFound();

    const { title, publishedAt, summary: description, image } = post.metadata;
    const ogImage = image
        ? `https://${baseURL}${image}`
        : `https://${baseURL}/og?title=${encodeURIComponent(title)}`;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            type: "article",
            publishedTime: publishedAt,
            url: `https://${baseURL}/blog/${post.slug}`,
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

export default async function BlogPage({ params }: Params) {
    const awaitedParams = await params;
    const slug = awaitedParams.slug;
    const posts = getPosts(["src", "app", "blog", "posts"]);
    const post = posts.find((p) => p.slug === slug);

    if (!post) {
        notFound();
    }

    const avatars =
        (post.metadata.team as { avatar: string }[])?.map((p) => ({ src: p.avatar })) || [];

    return (
        <Column as="section" maxWidth="xs" gap="l">
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
                            : `https://${baseURL}/og?title=${encodeURIComponent(
                                post.metadata.title
                            )}`,
                        url: `https://${baseURL}/blog/${post.slug}`,
                        author: {
                            "@type": "Person",
                            name: person.name,
                        },
                    }),
                }}
            />
            <Button
                href="/blog"
                weight="default"
                variant="tertiary"
                size="s"
                prefixIcon="chevronLeft"
            >
                Posts
            </Button>
            <Heading variant="display-strong-s">{post.metadata.title}</Heading>
            <Row gap="12" vertical="center">
                {avatars.length > 0 && <AvatarGroup size="s" avatars={avatars} />}
                <Text variant="body-default-s" onBackground="neutral-weak">
                    {formatDate(post.metadata.publishedAt)}
                </Text>
            </Row>
            <Column as="article" fillWidth>
                {post.isHTML ? (
                    <BlogImageEnhancer
                        content={post.content}
                        images={post.metadata.images}
                    />
                ) : (
                    <CustomMDX source={post.content} />
                )}
            </Column>
            <ScrollToHash />
        </Column>
    );
}
