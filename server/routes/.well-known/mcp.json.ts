import { MCP_PROTOCOL_VERSION, MCP_SERVER_INFO } from "../../utils/mcp";

export default defineEventHandler((event) => {
  const config = useRuntimeConfig(event);
  const base = (config.public.baseURL ?? "").replace(/\/+$/, "");

  setHeader(event, "Content-Type", "application/json");
  return {
    schema_version: "v1",
    name_for_human: MCP_SERVER_INFO.name,
    name_for_model: MCP_SERVER_INFO.name,
    description_for_human: `Read-only MCP server for ${config.public.ownerName ?? "akshara.dev"} — list projects, blog posts, and search resources.`,
    description_for_model:
      "Use this server to read Akshara Hegde's portfolio content: list_projects, list_blog_posts, and search_resources tools.",
    mcp: {
      protocolVersion: MCP_PROTOCOL_VERSION,
      transport: "streamable-http",
      url: `${base}/mcp`,
    },
  };
});
