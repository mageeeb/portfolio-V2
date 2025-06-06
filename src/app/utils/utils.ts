import fs from "fs";
import path from "path";
import matter from "gray-matter";

type Team = {
  name: string;
  role: string;
  avatar: string;
  linkedIn: string;
};

type Metadata = {
  title: string;
  publishedAt: string;
  summary: string;
  image?: string;
  images: string[];
  tag?: string;
  team: Team[];
  link?: string;
};

import { notFound } from 'next/navigation';

function getBlogFiles(dir: string) {
  if (!fs.existsSync(dir)) {
    notFound();
  }

  return fs.readdirSync(dir).filter((file) => 
    path.extname(file) === ".mdx" || path.extname(file) === ".json"
  );
}

function readBlogFile(filePath: string) {
    if (!fs.existsSync(filePath)) {
        notFound();
    }

  const fileExt = path.extname(filePath);

  if (fileExt === ".json") {
    const rawContent = fs.readFileSync(filePath, "utf-8");
    const jsonData = JSON.parse(rawContent);

    return {
      metadata: {
        title: jsonData.metadata.title || "",
        publishedAt: jsonData.metadata.publishedAt,
        summary: jsonData.metadata.summary || "",
        image: jsonData.metadata.image || "",
        images: jsonData.metadata.images || [],
        tag: jsonData.metadata.tag || [],
        team: jsonData.metadata.team || [],
        link: jsonData.metadata.link || "",
      },
      content: jsonData.content,
      isHTML: true
    };
  } else {
    // MDX file
    const rawContent = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(rawContent);

    const metadata: Metadata = {
      title: data.title || "",
      publishedAt: data.publishedAt,
      summary: data.summary || "",
      image: data.image || "",
      images: data.images || [],
      tag: data.tag || [],
      team: data.team || [],
      link: data.link || "",
    };

    return { metadata, content, isHTML: false };
  }
}

function getBlogData(dir: string) {
  const blogFiles = getBlogFiles(dir);
  return blogFiles.map((file) => {
    const { metadata, content, isHTML } = readBlogFile(path.join(dir, file));
    const slug = path.basename(file, path.extname(file));

    return {
      metadata,
      slug,
      content,
      isHTML
    };
  });
}

export function getPosts(customPath = ["", "", "", ""]) {
  const postsDir = path.join(process.cwd(), ...customPath);
  return getBlogData(postsDir);
}
