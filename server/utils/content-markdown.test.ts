import { describe, expect, test, mock } from "bun:test";

function makeQuery(rows: any[]) {
  const query: any = {
    _rows: rows,
    where(field: string, op: string, value: any) {
      if (op === "==") {
        query._rows = query._rows.filter((row: any) => row[field] === value);
      } else if (op === "<>") {
        query._rows = query._rows.filter((row: any) => row[field] !== value);
      }
      return query;
    },
    order() {
      return query;
    },
    async all() {
      return query._rows;
    },
    async first() {
      return query._rows[0] ?? null;
    },
  };
  return query;
}

const collections: Record<string, any[]> = {
  content: [{ path: "/resources", title: "Resources", rawbody: "# Resources\n\nStuff." }],
  blog: [],
  projects: [],
  labs: [],
  certifications: [],
};

mock.module("@nuxt/content/server", () => ({
  queryCollection: (_event: any, name: string) => makeQuery(collections[name] ?? []),
}));

const { resolveMarkdownForPath, notFoundMarkdown } = await import("./content-markdown");

describe("resolveMarkdownForPath", () => {
  test("serves the raw markdown body for a known content page", async () => {
    const result = await resolveMarkdownForPath({}, "/resources", "https://example.com");
    expect(result.status).toBe(200);
    expect(result.body).toContain("# Resources");
  });

  test("normalizes a trailing slash before matching", async () => {
    const result = await resolveMarkdownForPath({}, "/resources/", "https://example.com");
    expect(result.status).toBe(200);
  });

  test("returns a 404 markdown body pointing agents at recovery links", async () => {
    const result = await resolveMarkdownForPath({}, "/nope-not-a-real-page", "https://example.com");
    expect(result.status).toBe(404);
    expect(result.body).toContain("https://example.com/sitemap.xml");
    expect(result.body).toContain("https://example.com/llms.txt");
  });
});

describe("notFoundMarkdown", () => {
  test("links to the sitemap and llms.txt", () => {
    const body = notFoundMarkdown("https://example.com");
    expect(body).toContain("[Sitemap](https://example.com/sitemap.xml)");
    expect(body).toContain("[llms.txt](https://example.com/llms.txt)");
  });
});
