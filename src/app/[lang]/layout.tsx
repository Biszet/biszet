import '../../styles/globals.scss'
// NEU: Import für Metadata Typ
import type { Metadata } from 'next'

import { Noto_Sans_Display, Noto_Serif, Noto_Serif_Display } from 'next/font/google'
import { Navigation } from "@/components/Navigation";
import { getDictionary } from "@/get-dictionaries";
import { Footer } from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import React from "react";

// --- Font Konfigurationen (unverändert) ---
const notoSerif = Noto_Serif({
    weight: 'variable',
    style: ['normal', 'italic'],
    subsets: ['latin'],
    variable: '--biszet-body-font-family',
    display: 'swap',
    axes: ['wdth']
})

const notoSerifDisplay = Noto_Serif_Display({
    weight: 'variable',
    style: ['normal', 'italic'],
    subsets: ['latin'],
    variable: '--biszet-head-font-family',
    display: 'swap',
    axes: ['wdth']
})

const notoSansDisplay = Noto_Sans_Display({
    weight: 'variable',
    style: ['normal', 'italic'],
    subsets: ['latin'],
    variable: '--biszet-font-sans-serif',
    display: 'swap'
})

export const metadata: Metadata = {
    metadataBase: new URL('https://biszet.com'),
    title: 'biszet | Der Luxus Kosmetik Kühlschrank',
    description: 'Made in Germany.',
}

export async function generateStaticParams() {
    return [{ lang: 'de' }, { lang: 'en' }]
}

// @ts-ignore
export default async function Root({ children, params }) {
    // 1. Aktuelles Dictionary laden (für Texte)
    const dict = await getDictionary(params.lang);

    // 2. Anderes Dictionary laden (für das Link-Mapping)
    const otherLang = params.lang === 'de' ? 'en' : 'de';
    const otherDict = await getDictionary(otherLang);

    // 3. Daten vorbereiten
    const header = (dict as any).header;
    const footer = (dict as any).footer;
    const articles = (dict as any).articles || {};
    const otherArticles = (otherDict as any).articles || {};

    // 4. Slug-Map erstellen (Übersetzungstabelle für URLs)
    // Ergebnis z.B.: { "experten-interview-de": "expert-interview-en" }
    const slugMap: Record<string, string> = {};

    Object.keys(articles).forEach(key => {
        // Wir nutzen die ID (key), um die passenden Slugs zu finden
        const currentSlug = articles[key]?.slug;
        const otherSlug = otherArticles[key]?.slug;

        if (currentSlug && otherSlug) {
            slugMap[currentSlug] = otherSlug;
        }
    });

    return (
        <html lang={params.lang}>
            <body className={`${notoSerifDisplay.variable} ${notoSansDisplay.variable} ${notoSerif.variable}`}>

                {/* 5. Navigation mit den neuen Daten füttern */}
                <Navigation
                    current={params.lang}
                    logo={header?.logo}
                    articles={articles} // Für das Dropdown-Menü
                    slugMap={slugMap}   // Für den Sprachwechsler
                />

                <main>{children}</main>

                <Footer current={params.lang} logo={footer?.logo}></Footer>

                <CookieConsent current={params.lang} />
            </body>
        </html>
    )
}