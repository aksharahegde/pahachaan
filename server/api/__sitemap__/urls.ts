// import type { ParsedContent } from "@nuxt/content/dist/runtime/types";
// import { serverqueryCollection } from "#content/server";
// import { asSitemapUrl, defineSitemapEventHandler } from "#imports";

// export default defineSitemapEventHandler(async (e) => {
//   const contentList = (await serverqueryCollection(e).all()) as ParsedContent[];
//   const final = contentList
//     .filter((c) => c._dir.startsWith("blog"))
//     .map((c) => {
//       return asSitemapUrl({
//         loc: c._path,
//         lastmod: new Date(),
//       });
//     });
//   return final;
// });
