import { MetadataRoute } from 'next'
import { getDictionary } from '@/get-dictionaries'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://biszet.com';

  // 1. Wir laden BEIDE Wörterbücher, um an die korrekten Slugs zu kommen
  const dictDe = await getDictionary('de');
  const dictEn = await getDictionary('en');

  // 2. Statische Seiten (ohne 'wissen', das machen wir manuell)
  const staticRoutes = [
    '', // Home
    'story',
    'technology',
    'contact',
    'imprint',
    'data-protection'
  ];

  let entries: MetadataRoute.Sitemap = [];

  // --- A) Statische Seiten generieren ---
  for (const route of staticRoutes) {
    // Deutsch
    entries.push({
      url: `${baseUrl}/de${route ? `/${route}` : ''}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: route === '' ? 1.0 : 0.8,
    });

    // Englisch
    entries.push({
      url: `${baseUrl}/en${route ? `/${route}` : ''}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: route === '' ? 1.0 : 0.8,
    });
  }

  // --- B) Die Wissens-Übersicht (Spezialfall wegen URL-Namen) ---
  entries.push({
    url: `${baseUrl}/de/wissen`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.9,
  });
  entries.push({
    url: `${baseUrl}/en/knowledge`, // WICHTIG: Hier erzwingen wir "knowledge"
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.9,
  });

  // --- C) Artikel DEUTSCH ---
  // Wir iterieren über die Werte (Objects), nicht die Keys!
  const articlesDe = (dictDe as any).articles || {};
  Object.values(articlesDe).forEach((article: any) => {
    if (article.slug) {
      entries.push({
        url: `${baseUrl}/de/wissen/${article.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    }
  });

  // --- D) Artikel ENGLISCH ---
  const articlesEn = (dictEn as any).articles || {};
  Object.values(articlesEn).forEach((article: any) => {
    if (article.slug) {
      entries.push({
        // WICHTIG: Pfad "knowledge" und englischer Slug aus der JSON
        url: `${baseUrl}/en/knowledge/${article.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    }
  });

  return entries;
}