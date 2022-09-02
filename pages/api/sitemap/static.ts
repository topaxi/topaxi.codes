import { NextApiRequest, NextApiResponse } from "next";
import { renderEntry, SitemapEntry } from "../../../utils/sitemap";

const staticEntries: SitemapEntry[] = [
  { loc: "", changefreq: "daily", priority: "1" },
];

export default async function sitemaptags(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  const { host, "x-forwarded-proto": schema = "http" } = req.headers;
  const baseUrl = `${schema}://${host}`;

  const entries = staticEntries.map((entry) => ({
    ...entry,
    loc: `${baseUrl}/${entry.loc}`,
  }));

  res.setHeader("Content-Type", "application/xml").status(200);

  res.write(`<?xml version="1.0" encoding="UTF-8"?>\n`);
  res.write(`<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>\n`);
  res.write(
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n`
  );

  for (let entry of entries) {
    res.write(renderEntry(entry));
  }

  res.end("</urlset>");
}
