import { getDictionary } from "@/get-dictionaries";
import { getMetadata } from "@/utils/getMetadata";
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Locale } from "@/i18n-config";

// Interface für die params
interface PageProps {
    params: { lang: string }
}

export async function generateMetadata({ params }: PageProps) {
    const dict = await getDictionary(params.lang as Locale);
    // Zugriff sicherstellen (mit Fallback, falls imprint noch nicht geladen ist)
    const meta = (dict as any).imprint?.meta || {};
    return getMetadata(meta);
}

export default async function Page({ params }: PageProps) {
    const dict = await getDictionary(params.lang as Locale);
    
    // Wir holen uns den HTML-String aus dem Feld 'content'
    const moduleData = (dict as any).imprint?.modules?.imprint || {};
    const contentHtml = moduleData.content || "";

    return (
        <div className="py-5 mt-5">
            <Container>
                <Row className="justify-content-center">
                    <Col lg={8}>
                        {/* Hier rendern wir das komplette HTML aus der JSON.
                           Die Klasse 'imprint-content' hilft dir, falls du später CSS-Anpassungen brauchst.
                        */}
                        <div 
                            className="imprint-content" 
                            dangerouslySetInnerHTML={{ __html: contentHtml }} 
                        />
                    </Col>
                </Row>
            </Container>
        </div>
    );
}