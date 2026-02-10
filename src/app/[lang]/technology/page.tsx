import { getDictionary } from "@/get-dictionaries";
import { FeatureShowcase } from "@/components/FeatureShowcase";
import { EditorialSplit } from "@/components/EditorialSplit";
import { TechTable } from "@/components/TechTable";
import { TextTeaser } from "@/components/TextTeaser";
import { getMetadata } from "@/utils/getMetadata";
// NEU: Import FAQ Section
import FaqSection from '@/components/FaqSection';

interface PageProps {
    params: { lang: string };
}

// @ts-ignore
export async function generateMetadata({ params }: PageProps) {
    const dict = await getDictionary(params.lang as any);
    const meta = (dict as any).technology?.meta;
    return getMetadata(meta);
}

// @ts-ignore
export default async function Page({ params }: PageProps) {

    const dict = await getDictionary(params.lang as any);
    // Zugriff auf Technology und den neuen FAQ Block
    const technology = (dict as any).technology;
    const faqData = technology.faq;

    // Schema.org JSON-LD generieren (Wichtig für SEO auf der Technik-Seite!)
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': faqData?.items?.map((item: any) => ({
            '@type': 'Question',
            'name': item.question,
            'acceptedAnswer': {
                '@type': 'Answer',
                'text': item.answer
            }
        })) || []
    };

    return (
        <>
             {/* SEO Script */}
             <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <FeatureShowcase 
                {...technology.modules.featureShowcase} 
                backgroundColor={technology.modules.featureShowcase.backgroundColor as "turkis" | "secondary"} 
                first
            />
            
            <EditorialSplit 
                {...technology.modules.editorialSplit} 
                variant={technology.modules.editorialSplit.variant as "default" | "subtle" | "overlay" | "background"} 
                overlayColor={technology.modules.editorialSplit.overlayColor as "turkis" | "secondary" | "white"} 
            />
            
            <TextTeaser 
                {...technology.modules.textTeaser} 
                backgroundColor={technology.modules.textTeaser.backgroundColor as "turkis" | "secondary"}
            />
            
            <EditorialSplit {...technology.modules.editorialSplit2}>
                <TechTable {...technology.modules.editorialSplit2.table}/>
            </EditorialSplit>

            {/* NEU: FAQ Sektion vor dem letzten Teaser */}
            {faqData && (
                <FaqSection
                    title={faqData.title}
                    items={faqData.items}
                />
            )}

            <TextTeaser {...technology.modules.textTeaserStory}/>
        </>
    );
}