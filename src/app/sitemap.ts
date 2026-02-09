import { MetadataRoute } from 'next'
import { getDictionary } from '@/get-dictionaries' // Pfad ggf. anpassen

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

  const baseUrl = 'https://biszet.com';

  // 2. Sprachen und Seiten definieren
  const languages = ['de', 'en'];

  // Die statischen Pfade, die es gibt
  // ('wissen' ist der Ordnername, daher auch im Englischen technisch '/en/wissen')
  const staticRoutes = [
    '',
    'story',
    'technology',
    'contact',
    'wissen'
  ];

  // 3. Dynamische Artikel-Slugs holen
  // Wir laden einmal das deutsche Wörterbuch, um die Keys (Slugs) zu bekommen.
  // Da die Slugs in der JSON vermutlich gleich sind (Keys), reicht ein Dictionary.
  const dict = await getDictionary('de');
  const articles = (dict as any).articles;
  const articleSlugs = Object.keys(articles);

  // 4. Sitemap zusammenbauen
  let entries: MetadataRoute.Sitemap = [];

  for (const lang of languages) {
    // A) Statische Seiten hinzufügen
    for (const route of staticRoutes) {
      entries.push({
        url: `${baseUrl}/${lang}${route ? `/${route}` : ''}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: route === '' ? 1.0 : 0.8, // Startseite ist am wichtigsten
      });
    }

    // B) Artikel hinzufügen
    for (const slug of articleSlugs) {
      entries.push({
        url: `${baseUrl}/${lang}/wissen/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly', // Artikel ändern sich evtl. öfter (oder sind neu)
        priority: 0.7,
      });
    }
  }

  return entries;
}