import { queryCollection } from "@nuxt/content/server";

function escapeXml(text: string) {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const base = (config.public.baseURL ?? "").replace(/\/$/, "");

  const posts = await queryCollection(event, "blog")
    .where("title", "<>", "Blog")
    .order("published", "DESC")
    .all();

  const items = posts
    .filter(
      (p) =>
        typeof p.path === "string" &&
        p.path.startsWith("/blog/") &&
        typeof p.title === "string" &&
        typeof p.description === "string" &&
        typeof p.published === "string"
    )
    .map((p) => {
      const link = `${base}${p.path}`;
      const pubDate = new Date(p.published).toUTCString();
      return `    <item>
      <title>${escapeXml(p.title)}</title>
      <link>${escapeXml(link)}</link>
      <guid>${escapeXml(link)}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escapeXml(p.description)}</description>
    </item>`;
    })
    .join("\n");

  const channelTitle = escapeXml(config.public.ownerName ?? "Blog");
  const channelLink = escapeXml(base || "/");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${channelTitle}</title>
    <link>${channelLink}</link>
    <description>Latest posts from ${channelTitle}</description>
    <atom:link href="${escapeXml(base)}/rss.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;

  setResponseHeader(event, "content-type", "application/rss+xml; charset=utf-8");
  return xml;
});
