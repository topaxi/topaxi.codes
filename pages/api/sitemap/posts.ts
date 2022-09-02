import { getStoryblokApi, StoryData } from "@storyblok/react";
import { NextApiRequest, NextApiResponse } from "next";
import { renderEntry, SitemapEntry } from "../../../utils/sitemap";

function mapToEntry(baseUrl: string) {
  return (story: StoryData): SitemapEntry => {
    return {
      loc: `${baseUrl}/${story.slug}`,
      lastmod: story.published_at,
      changefreq: "daily",
      priority: "0.5",
    };
  };
}

export default async function sitemapposts(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  const { host, "x-forwarded-proto": schema = "http" } = req.headers;
  const baseUrl = `${schema}://${host}`;

  const storyblokApi = getStoryblokApi();

  let { data } = await storyblokApi.get(`cdn/stories/`, {
    sort_by: "first_published_at:desc",
  });

  res.setHeader("Content-Type", "application/xml").status(200);

  res.write(`<?xml version="1.0" encoding="UTF-8"?>\n`);
  res.write(`<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>\n`);
  res.write(
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n`
  );

  for (let entry of data?.stories.map(mapToEntry(baseUrl))) {
    res.write(renderEntry(entry));
  }

  res.end("</urlset>");
}
