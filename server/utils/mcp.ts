export const MCP_PROTOCOL_VERSION = "2025-03-26";
export const MCP_SERVER_INFO = { name: "akshara-dev", version: "1.0.0" };

export interface McpToolDefinition {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
}

export function listTools(): McpToolDefinition[] {
  return [
    {
      name: "list_projects",
      description: "List Akshara Hegde's active open-source and personal projects with descriptions and URLs.",
      inputSchema: { type: "object", properties: {}, additionalProperties: false },
    },
    {
      name: "list_blog_posts",
      description: "List recent blog posts from akshara.dev, most recent first.",
      inputSchema: {
        type: "object",
        properties: {
          limit: { type: "number", description: "Maximum number of posts to return (default 10)." },
        },
        additionalProperties: false,
      },
    },
    {
      name: "search_resources",
      description: "Search Akshara Hegde's curated developer resources (tools, libraries, references) by keyword.",
      inputSchema: {
        type: "object",
        properties: {
          query: { type: "string", description: "Keyword to search for. Omit to list all resources." },
        },
        additionalProperties: false,
      },
    },
  ];
}

function jsonRpcResult(id: unknown, result: unknown) {
  return { jsonrpc: "2.0" as const, id, result };
}

function jsonRpcError(id: unknown, code: number, message: string) {
  return { jsonrpc: "2.0" as const, id, error: { code, message } };
}

export interface McpToolCallHandlers {
  callTool: (name: string, args: Record<string, unknown>) => Promise<Array<{ type: "text"; text: string }>>;
}

/**
 * Pure JSON-RPC 2.0 dispatcher for the MCP Streamable HTTP transport.
 * Returns `null` for notifications, which must receive no response body.
 */
export async function handleMcpRequest(
  body: any,
  handlers: McpToolCallHandlers
): Promise<Record<string, unknown> | null> {
  if (!body || typeof body !== "object" || body.jsonrpc !== "2.0" || typeof body.method !== "string") {
    return jsonRpcError(body?.id ?? null, -32600, "Invalid Request");
  }

  const { id, method, params } = body;
  const isNotification = !("id" in body);

  switch (method) {
    case "initialize":
      return jsonRpcResult(id, {
        protocolVersion: MCP_PROTOCOL_VERSION,
        capabilities: { tools: {} },
        serverInfo: MCP_SERVER_INFO,
      });

    case "notifications/initialized":
      return null;

    case "ping":
      return jsonRpcResult(id, {});

    case "tools/list":
      return jsonRpcResult(id, { tools: listTools() });

    case "tools/call": {
      const name = params?.name;
      const args = params?.arguments ?? {};
      if (typeof name !== "string") {
        return jsonRpcError(id, -32602, "Invalid params: 'name' is required");
      }
      try {
        const content = await handlers.callTool(name, args);
        return jsonRpcResult(id, { content, isError: false });
      } catch (error) {
        return jsonRpcResult(id, {
          content: [{ type: "text", text: error instanceof Error ? error.message : "Tool call failed" }],
          isError: true,
        });
      }
    }

    default:
      if (isNotification) return null;
      return jsonRpcError(id ?? null, -32601, `Method not found: ${method}`);
  }
}
