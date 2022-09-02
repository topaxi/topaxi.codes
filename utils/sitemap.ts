export interface SitemapEntry {
  loc: string;
  lastmod?: any;
  changefreq?:
    | "never"
    | "yearly"
    | "monthly"
    | "weekly"
    | "daily"
    | "hourly"
    | "always";
  priority?: string;
}

export function renderEntry(entry: SitemapEntry): string {
  const output = ["<url>\n"];

  output.push("  <loc>");
  output.push(String(entry.loc));
  output.push("</loc>\n");

  if (entry.priority) {
    output.push("  <priority>");
    output.push(String(entry.priority));
    output.push("</priority>\n");
  }

  if (entry.changefreq) {
    output.push("  <changefreq>");
    output.push(String(entry.changefreq));
    output.push("</changefreq>\n");
  }

  if (entry.lastmod) {
    output.push("  <lastmod>");
    output.push(String(entry.lastmod));
    output.push("</lastmod>\n");
  }

  output.push("</url>\n");

  return output.join("");
}
