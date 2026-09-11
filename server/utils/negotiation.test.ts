import { describe, expect, test } from "bun:test";

import { prefersMarkdown } from "./negotiation";

describe("prefersMarkdown", () => {
  test("returns false when there is no Accept header", () => {
    expect(prefersMarkdown(undefined)).toBe(false);
    expect(prefersMarkdown(null)).toBe(false);
    expect(prefersMarkdown("")).toBe(false);
  });

  test("returns false when markdown is not requested", () => {
    expect(prefersMarkdown("text/html")).toBe(false);
    expect(prefersMarkdown("text/html,application/xhtml+xml,*/*;q=0.8")).toBe(false);
  });

  test("returns true for a bare markdown request", () => {
    expect(prefersMarkdown("text/markdown")).toBe(true);
  });

  test("returns true when markdown has equal or higher priority than html", () => {
    expect(prefersMarkdown("text/markdown, text/html;q=0.5")).toBe(true);
    expect(prefersMarkdown("text/markdown;q=0.9, text/html;q=0.9")).toBe(true);
  });

  test("returns false when html is explicitly preferred over markdown", () => {
    expect(prefersMarkdown("text/html;q=1.0, text/markdown;q=0.5")).toBe(false);
  });

  test("is case-insensitive and ignores whitespace", () => {
    expect(prefersMarkdown(" TEXT/MARKDOWN ; q=1.0 , text/HTML;q=0.2 ")).toBe(true);
  });
});
