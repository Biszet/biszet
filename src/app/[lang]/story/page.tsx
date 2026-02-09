// app/lang/[lang]/page.tsx
// This file acts as the entry point for a dynamic language route.

import Stage from "@/components/Stage";
import {getDictionary} from "@/get-dictionaries";

import {ImageSplit} from "@/components/ImageSplit";
import {Editorial} from "@/components/Editorial";
import {TextTeaser} from "@/components/TextTeaser";
import {Reference} from "@/components/Reference";
import MultiItemCarousel from "@/components/Carousel";
import {getMetadata} from "@/utils/getMetadata";

// @ts-ignore
export async function generateMetadata({params}) {
    const {story: {meta}} = await getDictionary(params.lang);
    return getMetadata(meta)
}

// @ts-ignore
export default async function Page({params}) {

    const {story} = await getDictionary(params.lang);

    return (
        <>
            <ImageSplit {...story.modules.imageSplit} first/>
            <Editorial {...story.modules.editorial}/>
            <TextTeaser {...story.modules.textTeaser}/>
            <Reference {...story.modules.reference}/>
            <MultiItemCarousel {...story.modules.carousel}/>
        </>
    );
}
