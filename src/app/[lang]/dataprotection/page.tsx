import { getDictionary } from "@/get-dictionaries";
import { getMetadata } from "@/utils/getMetadata";
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Locale } from "@/i18n-config";

interface PageProps {
    params: { lang: string }
}

export async function generateMetadata({ params }: PageProps) {
    const dict = await getDictionary(params.lang as Locale);
    // Sicherer Zugriff mit Fallback
    const meta = (dict as any).dataProtection?.meta || {};
    return getMetadata(meta);
}

export default async function Page({ params }: PageProps) {
    const dict = await getDictionary(params.lang as Locale);
    
    // Zugriff auf das neue 'content' Feld
    const privacyModule = (dict as any).dataProtection?.modules?.privacy || {};
    const contentHtml = privacyModule.content || "";

    return (
        <div className="py-5 mt-5">
            <Container>
                <Row className="justify-content-center">
                    <Col lg={8}>
                        {/* Wir rendern den kompletten HTML-String.
                           Die Klasse 'privacy-content' erlaubt dir späteres Styling.
                        */}
                        <div 
                            className="privacy-content" 
                            dangerouslySetInnerHTML={{ __html: contentHtml }} 
                        />
                    </Col>
                </Row>
            </Container>
        </div>
    );
}