// app/lang/[lang]/page.tsx
// This file acts as the entry point for a dynamic language route.

import Stage from "@/components/Stage";
import {getDictionary} from "@/get-dictionaries";
import {LanguageChooser} from "@/components/LanguageChooser";
import {Navigation} from "@/components/Navigation";
import {Contact} from "@/components/Contact";
import {getMetadata} from "@/utils/getMetadata";

// @ts-ignore
export async function generateMetadata({params}) {
    const {contact: {meta}} = await getDictionary(params.lang);
    return getMetadata(meta)
}
// @ts-ignore
export default async function Page({params}) {

    const {contact} = await getDictionary(params.lang);

    return (
        <>
            <Contact {...contact.modules.contact}/>
        </>
    );
}
