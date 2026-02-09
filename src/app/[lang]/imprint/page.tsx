// app/lang/[lang]/page.tsx
// This file acts as the entry point for a dynamic language route.

import Stage from "@/components/Stage";
import {getDictionary} from "@/get-dictionaries";
import {LanguageChooser} from "@/components/LanguageChooser";
import {Navigation} from "@/components/Navigation";
import {Contact} from "@/components/Contact";
import {getMetadata} from "@/utils/getMetadata";
import {EditorialText} from "@/components/EditorialText";
import React from "react";

// @ts-ignore
export async function generateMetadata({params}) {
    const {imprint: {meta}} = await getDictionary(params.lang);
    return getMetadata(meta)
}

// @ts-ignore
export default async function Page({params}) {

    const {imprint: {modules: {imprint: content}}} = await getDictionary(params.lang);

    return (
        <>
            <EditorialText title={content.headline} variant={"subtle"}>
                <h2>{content.editor}</h2>
                <p dangerouslySetInnerHTML={{__html: content.editorAddress}}></p>
                <h2>{content.legalHeadline}</h2>
                <div dangerouslySetInnerHTML={{__html: content.legalText}}></div>
                <h2>{content.dataHeadline}</h2>
                <p dangerouslySetInnerHTML={{__html: content.dataText}}></p>
                <h2>{content.liabilityHeadline}</h2>
                <div dangerouslySetInnerHTML={{__html: content.liabilityText}}></div>
                <h2>{content.copyrightHeadline}</h2>
                <p dangerouslySetInnerHTML={{__html: content.copyrightText}}></p>
            </EditorialText>
        </>
    );
}
