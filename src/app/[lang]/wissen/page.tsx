import { getDictionary } from "@/get-dictionaries";
import { Container, Row, Col } from "react-bootstrap";
import { ArticleGrid } from "@/components/ArticleGrid";
import React from "react";
import { Locale } from "@/i18n-config";
import { Metadata } from "next";

interface PageProps {
    params: { lang: string };
}

// NEU: Dynamische Generierung der Meta-Daten aus der JSON
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const dict = await getDictionary(params.lang as Locale);
    const meta = (dict as any).knowledge?.meta;

    return {
        title: meta?.title || 'Wissen & Expertise | biszet',
        description: meta?.description || '',
        keywords: meta?.keywords || '',
        openGraph: {
            title: meta?.title,
            description: meta?.description,
            // Falls ein Bild in der JSON hinterlegt ist, nutzen wir es
            images: meta?.image?.src ? [meta.image.src] : [],
            url: meta?.currentUrl,
        },
        alternates: {
            canonical: meta?.currentUrl,
        },
    };
}

export default async function Page({ params }: PageProps) {
    const dict = await getDictionary(params.lang as Locale);
    const articles = (dict as any).articles || {};
    const ui = (dict as any).ui;

    // Basis-Pfad Logik (de -> wissen, en -> knowledge)
    const basePath = params.lang === 'de' ? 'wissen' : 'knowledge';

    // Daten für das Grid vorbereiten
    const articleList = Object.values(articles).map((article: any) => ({
        ...article,
        // Korrekter Linkaufbau
        href: `/${params.lang}/${basePath}/${article.slug}`,
    }));

    return (
        <div className="article-overview">
            <Container>
                <Row className="mb-5">
                    <Col lg={10}>
                        <span className="badge bg-secondary mb-3 text-uppercase" style={{letterSpacing: '2px'}}>
                            {ui?.knowledge_badge || (params.lang === 'de' ? 'Wissen' : 'Knowledge')}
                        </span>

                        <h1 className="display-4 mb-3">
                            {ui?.knowledge_overview_title || "Unser Wissen"}
                        </h1>

                        <p className="lead text-muted">
                            {ui?.knowledge_overview_intro || "Expertenwissen zur Lagerung von Kosmetik."}
                        </p>
                    </Col>
                </Row>

                <ArticleGrid
                    articles={articleList}
                    btnLabel={ui?.read_article || (params.lang === 'de' ? 'Artikel lesen' : 'Read Article')}
                />
            </Container>
        </div>
    );
}