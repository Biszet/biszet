import {getDictionary} from "@/get-dictionaries";

// @ts-ignore
export async function getMetadata(meta) {
    return {
        title: meta.title,
        description: meta.description,
        keywords: meta.keywords,
        robots: {
            follow: true,
            index: true,
        },
        icons: {
            icon: '/favicon-32x32.png',
            shortcut: '/apple-touch-icon.png',
            apple: '/apple-touch-icon.png',
        },
        openGraph: {
            title: meta.title,
            description: meta.description,
            url: meta.currentUrl,
            images: [
                {
                    url: String(meta.image.src),
                    width: 800,
                    height: 600,
                    alt: meta.image.alt,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: meta.title,
            description: meta.description,
            images: [String(meta.image?.src)],
        },
        alternates: {
            canonical: meta.currentUrl,
            languages: {
                'x-default': meta.currentUrl,
            },
        },
    }
}