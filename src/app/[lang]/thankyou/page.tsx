// app/lang/[lang]/page.tsx
// This file acts as the entry point for a dynamic language route.

import {getDictionary} from "@/get-dictionaries";
import {getMetadata} from "@/utils/getMetadata";
import {EditorialSplit} from "@/components/EditorialSplit";
import React from "react";

// @ts-ignore
export async function generateMetadata({params}) {
    const {contactSuccess: {meta}} = await getDictionary(params.lang);
    return getMetadata(meta)
}

// @ts-ignore
export default async function Page({params}) {

    const {contactSuccess} = await getDictionary(params.lang);

    return (
        <>
            <EditorialSplit 
                {...contactSuccess.modules.success} 
                variant={contactSuccess.modules.success.variant as "background"}
                imageType={contactSuccess.modules.success.imageType as "gif" | "image" | undefined}
            />
        </>
    );
}
