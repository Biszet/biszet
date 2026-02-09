'use client';

import { Container, Accordion, Row, Col } from 'react-bootstrap';

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqSectionProps {
  title: string;
  items: FaqItem[];
}

export default function FaqSection({ title, items }: FaqSectionProps) {
  return (
    <section className="py-5 bg-light" id="faq-section">
      <Container>
        <Row className="justify-content-center">
          <Col lg={8}>
            {/* H2 für den Sektions-Titel (SEO relevant) */}
            <h2 className="text-center mb-5">{title}</h2>

            <Accordion defaultActiveKey="0">
              {items.map((item, index) => (
                <Accordion.Item eventKey={index.toString()} key={index}>
                  {/* H3 für die Fragen (Hierarchie-Ebene) */}
                  <Accordion.Header as="h3">
                   {item.question}
                  </Accordion.Header>
                  <Accordion.Body>
                    {/* HTML Rendering für fette Markierungen aktivieren */}
                    <div dangerouslySetInnerHTML={{ __html: item.answer }} />
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          </Col>
        </Row>
      </Container>
    </section>
  );
}