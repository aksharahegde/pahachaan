import { resolveMarkdownForPath } from "../utils/content-markdown";
import { prefersMarkdown } from "../utils/negotiation";

/**
 * Serves markdown content-negotiated responses (Accept: text/markdown) for
 * page routes, and marks every page response as Accept-varying so caches
 * never mix up the HTML and markdown variants. See acceptmarkdown.com.
 */
export default defineEventHandler(async (event) => {
  if (event.method !== "GET" && event.method !== "HEAD") return;

  const url = getRequestURL(event);
  const path = url.pathname;

  // Skip API routes, internal/build routes, and any path that already
  // resolves to its own file (rss.xml, sitemap.xml, DESIGN.md, assets, ...).
  if (path.startsWith("/api/") || path.startsWith("/_") || path.startsWith("/__") || path.includes(".")) {
    return;
  }

  appendHeader(event, "Vary", "Accept");

  const accept = getRequestHeader(event, "accept");
  if (!prefersMarkdown(accept)) return;

  const config = useRuntimeConfig(event);
  const baseURL = (config.public.baseURL ?? "").replace(/\/+$/, "");

  const result = await resolveMarkdownForPath(event, path, baseURL);

  setResponseStatus(event, result.status);
  setHeader(event, "Content-Type", "text/markdown; charset=utf-8");
  return result.body;
});
