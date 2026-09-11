import { queryCollection } from "@nuxt/content/server";
import { handleMcpRequest, MCP_PROTOCOL_VERSION, MCP_SERVER_INFO } from "../utils/mcp";

async function callTool(event: any, name: string, args: Record<string, unknown>) {
  switch (name) {
    case "list_projects": {
      const projects = await queryCollection(event, "projects").where("title", "<>", "Projects").all();
      const lines = projects
        .filter((p: any) => typeof p.title === "string")
        .map((p: any) => `- ${p.title}: ${p.description ?? ""} (${p.url ?? ""})`)
        .join("\n");
      return [{ type: "text" as const, text: lines || "No projects found." }];
    }

    case "list_blog_posts": {
      const limit = typeof args.limit === "number" && args.limit > 0 ? Math.floor(args.limit) : 10;
      const posts = await queryCollection(event, "blog")
        .where("title", "<>", "Blog")
        .order("published", "DESC")
        .limit(limit)
        .all();
      const config = useRuntimeConfig(event);
      const base = (config.public.baseURL ?? "").replace(/\/+$/, "");
      const lines = posts
        .filter((p: any) => typeof p.title === "string")
        .map((p: any) => `- ${p.title}: ${p.description ?? ""} (${base}${p.path})`)
        .join("\n");
      return [{ type: "text" as const, text: lines || "No posts found." }];
    }

    case "search_resources": {
      const query = typeof args.query === "string" ? args.query.trim().toLowerCase() : "";
      const groups = await queryCollection(event, "resources").all();
      const matches: string[] = [];
      for (const group of groups as any[]) {
        for (const link of group.links ?? []) {
          const label = link.title || link.url;
          const haystack = `${group.tag ?? ""} ${label} ${link.url}`.toLowerCase();
          if (!query || haystack.includes(query)) {
            matches.push(`- [${group.tag}] ${label}: ${link.url}`);
          }
        }
      }
      return [{ type: "text" as const, text: matches.slice(0, 25).join("\n") || "No matching resources." }];
    }

    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

export default defineEventHandler(async (event) => {
  if (event.method === "GET") {
    setHeader(event, "Content-Type", "application/json");
    return {
      protocolVersion: MCP_PROTOCOL_VERSION,
      transport: "streamable-http",
      serverInfo: MCP_SERVER_INFO,
      description:
        "MCP server for akshara.dev. POST JSON-RPC 2.0 requests here (initialize, tools/list, tools/call).",
    };
  }

  if (event.method !== "POST") {
    setResponseStatus(event, 405);
    setHeader(event, "Allow", "GET, POST");
    return { error: "Method not allowed" };
  }

  const body = await readBody(event);
  const response = await handleMcpRequest(body, {
    callTool: (name, args) => callTool(event, name, args),
  });

  if (response === null) {
    setResponseStatus(event, 202);
    return "";
  }

  setHeader(event, "Content-Type", "application/json");
  return response;
});
