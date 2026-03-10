import { NextResponse } from 'next/server'
import portfolio from '@/data/portfolio.json'

export async function GET() {
  const baseUrl = 'https://tawonarwatida.co.zw'
  
  const blogItems = portfolio.blog.map(post => `
    <item>
      <title>${escapeXml(post.title)}</title>
      <description>${escapeXml(post.excerpt)}</description>
      <link>${baseUrl}/#blog</link>
      <guid>${baseUrl}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <category>${post.tags.join(', ')}</category>
    </item>
  `).join('')

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Tawona Rwatida - Full Stack Developer Blog</title>
    <link>${baseUrl}</link>
    <description>Blog posts about software development, e-commerce, AI, and technology in Zimbabwe</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <image>
      <url>${baseUrl}/images/avatar.png</url>
      <title>Tawona Rwatida</title>
      <link>${baseUrl}</link>
    </image>
    ${blogItems}
  </channel>
</rss>`

  return new NextResponse(rss, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}

function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;'
      case '>': return '&gt;'
      case '&': return '&amp;'
      case '\'': return '&apos;'
      case '"': return '&quot;'
      default: return c
    }
  })
}
