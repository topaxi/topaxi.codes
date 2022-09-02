import { getStoryblokApi } from "@storyblok/react";
import { NextApiRequest, NextApiResponse } from "next";
import { renderEntry, SitemapEntry } from "../../../utils/sitemap";

interface TagData {
  name: string;
  taggings_count: number;
}

function mapToEntry(baseUrl: string) {
  return (tag: TagData): SitemapEntry => {
    return {
      loc: `${baseUrl}/tag/${tag.name}`,
      changefreq: "weekly",
      priority: "0.25",
    };
  };
}

export default async function sitemaptags(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  const { host, "x-forwarded-proto": schema = "http" } = req.headers;
  const baseUrl = `${schema}://${host}`;

  const storyblokApi = getStoryblokApi();

  let { data } = await storyblokApi.get(`cdn/tags/`);

  res.setHeader("Content-Type", "application/xml").status(200);

  res.write(`<?xml version="1.0" encoding="UTF-8"?>\n`);
  res.write(`<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>\n`);
  res.write(
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n`
  );

  for (let entry of data?.tags.map(mapToEntry(baseUrl))) {
    res.write(renderEntry(entry));
  }

  res.end("</urlset>");
}
