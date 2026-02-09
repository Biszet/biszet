// app/lang/[lang]/page.tsx
// This file acts as the entry point for a dynamic language route.


import {getDictionary} from "@/get-dictionaries";
import {FeatureShowcase} from "@/components/FeatureShowcase";
import {EditorialSplit} from "@/components/EditorialSplit";
import {TechTable} from "@/components/TechTable";
import {TextTeaser} from "@/components/TextTeaser";
import {getMetadata} from "@/utils/getMetadata";

// @ts-ignore
export async function generateMetadata({params}) {
    const {technology: {meta}} = await getDictionary(params.lang);
    return getMetadata(meta)
}
// @ts-ignore
export default async function Page({params}) {

    const {technology} = await getDictionary(params.lang);

    return (
        <>
            <FeatureShowcase {...technology.modules.featureShowcase} backgroundColor={technology.modules.featureShowcase.backgroundColor as "turkis" | "secondary"} first/>
            <EditorialSplit {...technology.modules.editorialSplit} variant={technology.modules.editorialSplit.variant as "default" | "subtle" | "overlay" | "background"} overlayColor={technology.modules.editorialSplit.overlayColor as "turkis" | "secondary" | "white"} />
            <TextTeaser {...technology.modules.textTeaser} backgroundColor={technology.modules.textTeaser.backgroundColor as "turkis" | "secondary"}/>
            <EditorialSplit {...technology.modules.editorialSplit2}><TechTable {...technology.modules.editorialSplit2.table}/></EditorialSplit>
            <TextTeaser {...technology.modules.textTeaserStory}/>
        </>
    );
}
