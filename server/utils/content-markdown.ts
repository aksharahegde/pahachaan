import { queryCollection } from "@nuxt/content/server";

export interface MarkdownNegotiationResult {
  status: 200 | 404;
  body: string;
}

function linkList(
  items: Array<{ href: string; label: string; description?: string }>
) {
  return items
    .map((item) =>
      item.description
        ? `- [${item.label}](${item.href}) — ${item.description}`
        : `- [${item.label}](${item.href})`
    )
    .join("\n");
}

export function notFoundMarkdown(baseURL: string) {
  return [
    "# 404 — Page not found",
    "",
    "There is no page at this path. Use one of these to find what you're looking for:",
    "",
    linkList([
      { href: `${baseURL}/sitemap.xml`, label: "Sitemap", description: "every indexed URL on this site" },
      { href: `${baseURL}/llms.txt`, label: "llms.txt", description: "machine-readable site overview" },
      { href: `${baseURL}/`, label: "Home" },
      { href: `${baseURL}/projects`, label: "Projects" },
      { href: `${baseURL}/blog`, label: "Writing" },
      { href: `${baseURL}/resources`, label: "Resources" },
    ]),
  ].join("\n");
}

// event is an H3Event; left untyped to match the rest of server/routes in this codebase.
export async function resolveMarkdownForPath(
  event: any,
  pathname: string,
  baseURL: string
): Promise<MarkdownNegotiationResult> {
  const path = pathname === "" ? "/" : pathname.replace(/\/+$/, "") || "/";

  const contentDoc = await queryCollection(event, "content")
    .where("path", "==", path)
    .first();
  if (contentDoc?.rawbody) {
    return { status: 200, body: contentDoc.rawbody };
  }

  if (path.startsWith("/blog/")) {
    const post = await queryCollection(event, "blog")
      .where("path", "==", path)
      .first();
    if (post?.rawbody) {
      const header = [`# ${post.title}`, post.description].filter(Boolean).join("\n\n");
      return { status: 200, body: `${header}\n\n${post.rawbody}` };
    }
  }

  if (path === "/blog") {
    const posts = await queryCollection(event, "blog")
      .where("title", "<>", "Blog")
      .order("published", "DESC")
      .all();
    const body = linkList(
      posts
        .filter((p) => typeof p.path === "string" && typeof p.title === "string")
        .map((p) => ({
          href: `${baseURL}${p.path}`,
          label: p.title as string,
          description: typeof p.description === "string" ? p.description : undefined,
        }))
    );
    return { status: 200, body: `# Writing\n\n${body}` };
  }

  if (path === "/projects") {
    const projects = await queryCollection(event, "projects")
      .where("title", "<>", "Projects")
      .all();
    const body = linkList(
      projects
        .filter((p) => typeof p.title === "string")
        .map((p) => ({
          href: typeof p.url === "string" && p.url ? p.url : `${baseURL}${p.path ?? ""}`,
          label: p.title as string,
          description: typeof p.description === "string" ? p.description : undefined,
        }))
    );
    return { status: 200, body: `# Projects\n\n${body}` };
  }

  if (path === "/labs") {
    const labs = await queryCollection(event, "labs")
      .where("title", "<>", "Labs")
      .all();
    const body = linkList(
      labs
        .filter((l) => typeof l.title === "string")
        .map((l) => ({
          href: `${baseURL}/labs`,
          label: l.title as string,
          description: typeof l.description === "string" ? l.description : undefined,
        }))
    );
    return { status: 200, body: `# Labs\n\n${body}` };
  }

  if (path === "/certifications") {
    const certs = await queryCollection(event, "certifications")
      .where("title", "<>", "Certifications")
      .all();
    const body = linkList(
      certs
        .filter((c) => typeof c.title === "string")
        .map((c) => ({
          href: typeof c.url === "string" && c.url ? c.url : `${baseURL}/certifications`,
          label: c.title as string,
          description: typeof c.issuer === "string" ? c.issuer : undefined,
        }))
    );
    return { status: 200, body: `# Certifications\n\n${body}` };
  }

  return { status: 404, body: notFoundMarkdown(baseURL) };
}
