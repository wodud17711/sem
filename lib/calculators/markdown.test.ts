import { describe, expect, it } from "vitest";
import { markdownToHtml } from "./markdown";

describe("markdownToHtml", () => {
  it("빈 입력", () => {
    expect(markdownToHtml("")).toBe("");
  });

  it("헤더", () => {
    expect(markdownToHtml("# 제목")).toContain("<h1>제목</h1>");
    expect(markdownToHtml("## 제목")).toContain("<h2>제목</h2>");
    expect(markdownToHtml("### 제목")).toContain("<h3>제목</h3>");
  });

  it("굵게/기울임", () => {
    expect(markdownToHtml("**굵은**")).toContain("<strong>굵은</strong>");
    expect(markdownToHtml("*기울임*")).toContain("<em>기울임</em>");
  });

  it("인라인 코드", () => {
    expect(markdownToHtml("이건 `code` 입니다")).toContain("<code>code</code>");
  });

  it("코드 블록", () => {
    const html = markdownToHtml("```\nfunction() {}\n```");
    expect(html).toContain("<pre><code>");
    expect(html).toContain("function() {}");
  });

  it("HTML 태그 입력 시 escape", () => {
    const html = markdownToHtml("<script>alert(1)</script>");
    expect(html).not.toContain("<script>");
    expect(html).toContain("&lt;script&gt;");
  });

  it("javascript: URL 차단", () => {
    const html = markdownToHtml("[click](javascript:alert(1))");
    // http/https 아닌 URL은 링크 변환 안 됨
    expect(html).not.toContain("href=\"javascript:");
  });

  it("정상 링크는 변환", () => {
    const html = markdownToHtml("[셈](https://sem.kr)");
    expect(html).toContain('href="https://sem.kr"');
    expect(html).toContain("rel=\"noopener noreferrer\"");
  });

  it("리스트", () => {
    const html = markdownToHtml("- 항목1\n- 항목2");
    expect(html).toContain("<ul>");
    expect(html).toContain("<li>항목1</li>");
    expect(html).toContain("<li>항목2</li>");
  });

  it("인용문", () => {
    const html = markdownToHtml("> 인용입니다");
    expect(html).toContain("<blockquote>");
    expect(html).toContain("인용입니다");
  });

  it("가로선", () => {
    const html = markdownToHtml("---");
    expect(html).toContain("<hr>");
  });

  it("단락", () => {
    const html = markdownToHtml("첫 단락\n\n둘째 단락");
    expect(html).toContain("<p>첫 단락</p>");
    expect(html).toContain("<p>둘째 단락</p>");
  });
});
