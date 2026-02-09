'use client';
import { Row, Col, Card, Button } from 'react-bootstrap';
import Link from 'next/link';

// Wir definieren genau, was wir von der page.tsx erwarten
export interface ArticleGridItem {
    slug: string;
    title: string;
    subtitle: string;
    image?: string;
    href: string; // Der fertige Link (wichtig für die Sprach-Logik!)
}

interface ArticleGridProps {
    articles: ArticleGridItem[];
    btnLabel: string; // Der Text für den Button ("Artikel lesen" / "Read Article")
}

export const ArticleGrid = ({ articles, btnLabel }: ArticleGridProps) => {
    return (
        <Row className="g-4">
            {articles.map((article) => (
                <Col key={article.slug} md={6} lg={4}>
                    <Card className="h-100 shadow border-0">

                        <div style={{
                            height: '240px',
                            backgroundColor: '#e9ecef',
                            backgroundImage: article.image ? `url(${article.image})` : 'none',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }} />

                        <Card.Body className="d-flex flex-column p-5">
                            <Card.Title as="h3" className="h5 mb-3">
                                {article.title}
                            </Card.Title>

                            <Card.Text className="text-muted flex-grow-1">
                                {article.subtitle}
                            </Card.Text>

                            <div className="mt-4">
                                {/* Wir nutzen hier den fertigen href aus dem Objekt */}
                                <Link href={article.href} passHref legacyBehavior>
                                    <Button variant="outline-dark" className="w-100">
                                        {btnLabel}
                                    </Button>
                                </Link>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
    );
};