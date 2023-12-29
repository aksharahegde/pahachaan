import type { ParsedContent } from "@nuxt/content/dist/runtime/types";
import { serverQueryContent } from "#content/server";
import { asSitemapUrl, defineSitemapEventHandler } from "#imports";

export default defineSitemapEventHandler(async (e) => {
  const contentList = (await serverQueryContent(e).find()) as ParsedContent[];
  const final = contentList
    .filter((c) => c._dir.startsWith("blog"))
    .map((c) => {
      return asSitemapUrl({
        loc: c._path,
        lastmod: new Date(),
      });
    });
  return final;
});
