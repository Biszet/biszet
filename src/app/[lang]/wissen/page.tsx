import { getDictionary } from "@/get-dictionaries";
import { Container, Row, Col } from "react-bootstrap";
import { Title } from "@/components/Title";
// Importieren Sie die korrigierte Component (achten Sie auf {} wenn es kein default export ist)
import { ArticleGrid } from "@/components/ArticleGrid";
import React from "react";

interface PageProps {
    params: { lang: string };
}

export const metadata = {
    title: 'Wissen & Expertise | biszet',
};

export default async function Page({ params }: PageProps) {

    const dict = await getDictionary(params.lang as any);
    const articles = (dict as any).articles || {};
    const ui = (dict as any).ui;

    // Basis-Pfad Logik (de -> wissen, en -> knowledge)
    const basePath = params.lang === 'de' ? 'wissen' : 'knowledge';

    // Daten für das Grid vorbereiten
    const articleList = Object.values(articles).map((article: any) => ({
        ...article,
        // Hier wird der korrekte Link gebaut:
        href: `/${params.lang}/${basePath}/${article.slug}`,
    }));

    return (
        <div className="py-5 mt-5">
            <Container>
                <Row className="mb-5">
                    <Col>
                        <Title
                            title={ui?.knowledge_overview_title || "Unser Wissen"}
                            shortText={ui?.knowledge_overview_intro || "Expertenwissen..."}
                            full
                            isHeading
                        />
                    </Col>
                </Row>

                {/* WICHTIG: Wir übergeben jetzt 'articles' UND 'btnLabel' */}
                <ArticleGrid
                    articles={articleList}
                    btnLabel={ui?.read_article || "Artikel lesen"}
                />
            </Container>
        </div>
    );
}