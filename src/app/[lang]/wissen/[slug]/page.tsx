import { getDictionary } from "@/get-dictionaries";
import { Container, Row, Col, Button } from "react-bootstrap";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";
import { Locale } from "@/i18n-config";

interface PageParams {
    lang: string;
    slug: string;
}

interface PageProps {
    params: PageParams;
}

async function getArticleBySlug(lang: Locale, slug: string) {
    const dict = await getDictionary(lang);
    const articles = (dict as any).articles || {};

    // Suche den Artikel
    const article = Object.values(articles).find((a: any) => a.slug === slug);

    return { article, ui: (dict as any).ui };
}

export async function generateMetadata({ params }: PageProps) {
    const { article } = await getArticleBySlug(params.lang as Locale, params.slug);

    if (!article) {
        return {};
    }

    const a = article as any;
    const meta = a.meta || {};

    // --- NEU: Dynamische Canonical URL berechnen ---
    const basePath = params.lang === 'de' ? 'wissen' : 'knowledge';
    const canonicalUrl = `https://biszet.com/${params.lang}/${basePath}/${params.slug}`;

    return {
        title: meta.title ? meta.title : `${a.title} | biszet`,
        description: meta.description || a.subtitle,
        keywords: meta.keywords || '',

        // Explizite Indexierung für Google & KIs anfordern
        robots: {
            index: true,
            follow: true,
        },

        // --- NEU: Der Canonical Tag für perfekte SEO ---
        alternates: {
            canonical: canonicalUrl,
        },

        openGraph: {
            title: meta.title || a.title,
            description: meta.description || a.subtitle,
            images: [a.image],
        },
    };
}

export default async function Page({ params }: PageProps) {
    const { article, ui } = await getArticleBySlug(params.lang as Locale, params.slug);

    if (!article) {
        notFound();
    }

    const a = article as any;

    // Das Schema.org JSON-LD für den Artikel
    const articleJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        'headline': a.title,
        'description': a.subtitle,
        'image': `https://biszet.com${a.image}`,
        'author': {
            '@type': 'Person',
            'name': a.author // Nimmt dynamisch den Namen aus der JSON (z.B. Dr. Kruppa)
        },
        'publisher': {
            '@type': 'Organization',
            'name': 'biszet GmbH',
            'logo': {
                '@type': 'ImageObject',
                'url': 'https://biszet.com/images_de/biszet-logo-kosmetik-kuehlschrank.svg'
            }
        },
        'datePublished': a.date
    };

    return (
        <article className="article-page">
            {/* Hier wird das Schema unsichtbar für Google in den Head gerendert */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
            />

            <Container>
                <Row className="mb-5">
                    <Col lg={8}>

                        <span className="badge bg-secondary mb-3 text-uppercase" style={{letterSpacing: '2px'}}>
                            {ui?.knowledge_badge || (params.lang === 'de' ? 'Wissen' : 'Knowledge')}
                        </span>

                        <h1 className="display-5 mt-3 mb-3">{a.title}</h1>
                        <hr/>
                        <p className="lead text-muted">{a.subtitle}</p>

                        <div className="text-muted mt-3">
                            <small>{a.date} • {a.author}</small>
                        </div>

                    </Col>

                    <Col lg={4}>
                        <Button
                            variant="link"
                            href={`/${params.lang}/${params.lang === 'de' ? 'wissen' : 'knowledge'}`}
                            className="text-muted p-0 text-decoration-none btn-link-reverse"
                            style={{ float: "right" }}
                        >
                            {ui?.back_to_overview || (params.lang === 'de' ? 'Zurück zur Übersicht' : 'Back to overview')}
                        </Button>
                    </Col>

                </Row>

                {a.image && (
                    <Row className="mb-5">
                        <Col xs={12}>
                            <div style={{ position: 'relative', width: '100%', height: '500px', maxHeight: '60vh' }}>
                                <Image
                                    src={a.image}
                                    alt={a.title}
                                    fill
                                    style={{ objectFit: 'cover', borderRadius: '4px' }}
                                    priority
                                />
                            </div>
                        </Col>
                    </Row>
                )}

                <Row className="justify-content-center">
                    <Col lg={10} className="article-content">
                        <div
                            dangerouslySetInnerHTML={{ __html: a.content }}
                            className="fs-5"
                            style={{ lineHeight: '1.8' }}
                        />
                    </Col>
                </Row>

                <Row className="mt-5 pt-5 border-top">
                    <Col className="text-center">
                        <Button href={`/${params.lang}/contact`} variant="link">
                            {params.lang === 'de' ? 'Kontakt aufnehmen' : 'Contact us'}
                        </Button>
                    </Col>
                </Row>
            </Container>
        </article>
    );
}