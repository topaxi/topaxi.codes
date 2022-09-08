import { NextApiRequest, NextApiResponse } from 'next'

export default async function sitemapindex(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  const { host, 'x-forwarded-proto': schema = 'http' } = req.headers

  res.setHeader('Content-Type', 'application/xml').status(200)
  res.end(`<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${schema}://${host}/sitemap/posts.xml</loc>
  </sitemap>
  <sitemap>
    <loc>${schema}://${host}/sitemap/tags.xml</loc>
  </sitemap>
  <sitemap>
    <loc>${schema}://${host}/sitemap/static.xml</loc>
  </sitemap>
</sitemapindex>`)
}
