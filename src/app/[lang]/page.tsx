// src/app/[lang]/page.tsx
import Stage from "@/components/Stage";
import { getDictionary } from "@/get-dictionaries"; // Achten Sie auf den korrekten Pfad (get-dictionaries vs getDictionary)

import MultiItemCarousel from "@/components/Carousel";
import { FeatureShowcase } from "@/components/FeatureShowcase";
import { EditorialSplit } from "@/components/EditorialSplit";
import { TextTeaser } from "@/components/TextTeaser";
import FaqSection from '@/components/FaqSection';
import { ContactTeaser } from "@/components/ContactTeaser";
import { getMetadata } from "@/utils/getMetadata";

// Typisierung für die Params
interface PageProps {
    params: { lang: string };
}

export async function generateMetadata({ params }: PageProps) {
    // @ts-ignore
    const dict = await getDictionary(params.lang);
    // Cast zu 'any', um TypeScript-Fehler zu vermeiden, falls Typen fehlen
    const meta = (dict as any).home.meta;
    return getMetadata(meta);
}

export default async function Page({ params }: PageProps) {
    // 1. Alle Daten laden
    // @ts-ignore
    const dict = await getDictionary(params.lang);

    // 2. Die einzelnen Bereiche extrahieren (mit 'any' Cast für Sicherheit)
    const home = (dict as any).home;
    const story = (dict as any).story;
    const faqData = (dict as any).faq; // WICHTIG: Das hat gefehlt!

    // 3. Schema.org JSON-LD generieren (für SEO)
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': faqData.items.map((item: any) => ({
            '@type': 'Question',
            'name': item.question,
            'acceptedAnswer': {
                '@type': 'Answer',
                'text': item.answer
            }
        }))
    };

    return (
        <>
            {/* SEO Script: Unsichtbar für Nutzer, sichtbar für Google */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* Sichtbare Komponenten */}
            <Stage
                {...home.modules.stage}
                variant={home.modules.stage.variant as "overlay" | "default"}
            />

            <MultiItemCarousel {...home.modules.carousel}/>

            <EditorialSplit
                {...home.modules.editorialSplit}
                variant={home.modules.editorialSplit.variant as "default" | "subtle" | "overlay" | "background"}
                imageType={home.modules.editorialSplit.imageType as "gif" | "image" | "video" | undefined }
            />

            <MultiItemCarousel
                {...story.modules.carousel}
                showItemTitles={true}
            />

            <FeatureShowcase {...home.modules.featureShowcase}/>

            <FaqSection
                title={faqData.title}
                items={faqData.items}
            />

            <ContactTeaser {...home.modules.contactTeaser}/>
        </>
    );
}