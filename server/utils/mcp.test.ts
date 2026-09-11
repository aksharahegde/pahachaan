import { describe, expect, test } from "bun:test";

import { handleMcpRequest, listTools, MCP_PROTOCOL_VERSION } from "./mcp";

const noopHandlers = {
  callTool: async () => [{ type: "text" as const, text: "ok" }],
};

describe("handleMcpRequest", () => {
  test("rejects a non JSON-RPC 2.0 body", async () => {
    const response = await handleMcpRequest({ id: 1, method: "initialize" }, noopHandlers);
    expect(response?.error?.code).toBe(-32600);
  });

  test("responds to initialize with the protocol version and server info", async () => {
    const response = await handleMcpRequest(
      { jsonrpc: "2.0", id: 1, method: "initialize" },
      noopHandlers
    );
    expect(response?.result?.protocolVersion).toBe(MCP_PROTOCOL_VERSION);
    expect(response?.result?.serverInfo?.name).toBeTruthy();
  });

  test("returns null for the initialized notification (no id)", async () => {
    const response = await handleMcpRequest(
      { jsonrpc: "2.0", method: "notifications/initialized" },
      noopHandlers
    );
    expect(response).toBeNull();
  });

  test("lists the advertised tools", async () => {
    const response = await handleMcpRequest(
      { jsonrpc: "2.0", id: 2, method: "tools/list" },
      noopHandlers
    );
    const tools = response?.result?.tools;
    expect(Array.isArray(tools)).toBe(true);
    expect(tools.map((t: any) => t.name)).toEqual(listTools().map((t) => t.name));
  });

  test("calls a tool and wraps the result", async () => {
    const response = await handleMcpRequest(
      { jsonrpc: "2.0", id: 3, method: "tools/call", params: { name: "list_projects", arguments: {} } },
      noopHandlers
    );
    expect(response?.result?.isError).toBe(false);
    expect(response?.result?.content[0].text).toBe("ok");
  });

  test("marks a failed tool call as isError without a JSON-RPC error envelope", async () => {
    const response = await handleMcpRequest(
      { jsonrpc: "2.0", id: 4, method: "tools/call", params: { name: "nope", arguments: {} } },
      { callTool: async () => { throw new Error("Unknown tool: nope"); } }
    );
    expect(response?.result?.isError).toBe(true);
    expect(response?.result?.content[0].text).toContain("Unknown tool");
  });

  test("returns method not found for an unknown request method", async () => {
    const response = await handleMcpRequest(
      { jsonrpc: "2.0", id: 5, method: "bogus/method" },
      noopHandlers
    );
    expect(response?.error?.code).toBe(-32601);
  });

  test("silently ignores an unknown notification", async () => {
    const response = await handleMcpRequest(
      { jsonrpc: "2.0", method: "notifications/bogus" },
      noopHandlers
    );
    expect(response).toBeNull();
  });
});
