import { getPosts } from "@/app/utils/utils";
import { baseURL, routes as routesConfig } from "@/app/resources";

export default async function sitemap() {
  const blogs = getPosts(["src", "app", "blog", "posts"]).map((post) => ({
    url: `https://${baseURL}/blog/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }));

  // Removed works array as we no longer support individual project pages

  // const activeRoutes = Object.keys(routesConfig).filter((route) => routesConfig[route]);
  const activeRoutes = Object.keys(routesConfig).filter(
      (route) => routesConfig[route as keyof typeof routesConfig]
  );

  const routes = activeRoutes.map((route) => ({
    url: `https://${baseURL}${route !== "/" ? route : ""}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...blogs];


}
