// app/lang/[lang]/page.tsx
// This file acts as the entry point for a dynamic language route.

import {getDictionary} from "@/get-dictionaries";
import {getMetadata} from "@/utils/getMetadata";
import {EditorialText} from "@/components/EditorialText";
import React from "react";

// @ts-ignore
export async function generateMetadata({params}) {
    const {dataProtection: {meta}} = await getDictionary(params.lang);
    return getMetadata(meta)
}

// @ts-ignore
export default async function Page({params}) {
    
    const {dataProtection: {modules: {privacy}}} = await getDictionary(params.lang);

    return (
        <>
            <EditorialText title={privacy.headline} variant={"subtle"}>
                <h2 >{privacy.usageHeadline}</h2>
                <p dangerouslySetInnerHTML={{__html: privacy.usageText}}></p>
                <h2 >{privacy.cookiesHeadline}</h2>
                <p dangerouslySetInnerHTML={{__html: privacy.cookiesText}}></p>
                <h2 >{privacy.rightHeadline}</h2>
                <p dangerouslySetInnerHTML={{__html: privacy.rightText}}></p>

            </EditorialText>
        </>
    );
}
