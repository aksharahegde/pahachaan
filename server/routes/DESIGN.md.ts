import { readFile } from "node:fs/promises";
import { join } from "node:path";

export default defineEventHandler(async (event) => {
  const content = await readFile(join(process.cwd(), "DESIGN.md"), "utf-8");

  setHeader(event, "Content-Type", "text/markdown; charset=utf-8");
  setHeader(event, "Content-Disposition", 'attachment; filename="DESIGN.md"');

  return content;
});
