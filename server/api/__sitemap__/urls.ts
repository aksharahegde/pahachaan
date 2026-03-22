import { queryCollection } from "@nuxt/content/server";

export default defineSitemapEventHandler(async (event) => {
  const posts = await queryCollection(event, "blog").all();

  return posts
    .filter(
      (entry) =>
        entry.title !== "Blog" &&
        typeof entry.path === "string" &&
        entry.path.startsWith("/blog/") &&
        entry.path !== "/blog"
    )
    .map((entry) => {
      const published =
        "published" in entry && typeof entry.published === "string"
          ? new Date(entry.published)
          : undefined;

      return {
        loc: entry.path as string,
        lastmod: published,
      };
    });
});
