import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {

  const baseUrl = 'https://biszet.com';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Private Pfade sperren (z.B. API oder Next.js Interna)
      disallow: ['/api/', '/_next/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}