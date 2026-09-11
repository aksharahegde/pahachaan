interface AcceptEntry {
  type: string;
  q: number;
}

function parseAccept(acceptHeader: string): AcceptEntry[] {
  return acceptHeader
    .split(",")
    .map((part) => {
      const [type, ...params] = part.trim().split(";");
      const qParam = params
        .map((p) => p.trim())
        .find((p) => p.startsWith("q="));
      const q = qParam ? Number.parseFloat(qParam.slice(2)) : 1;
      return { type: type.trim().toLowerCase(), q: Number.isFinite(q) ? q : 1 };
    })
    .filter((entry) => entry.type.length > 0);
}

/**
 * True when the client's Accept header asks for text/markdown at a
 * priority equal to or higher than text/html (acceptmarkdown.com negotiation).
 */
export function prefersMarkdown(acceptHeader: string | undefined | null): boolean {
  if (!acceptHeader) return false;

  const entries = parseAccept(acceptHeader);
  const markdown = entries.find((entry) => entry.type === "text/markdown");
  if (!markdown) return false;

  const html = entries.find(
    (entry) => entry.type === "text/html" || entry.type === "application/xhtml+xml"
  );
  if (!html) return true;

  return markdown.q >= html.q;
}
