import {Button, Col, Container, Row} from "react-bootstrap";
import Image from "next/image";
import {Title} from "@/components/Title";
import styles from './ContactTeaser.module.scss'
import classNames from "classnames";

export type ContactTeaserProps = {
    title: string,
    shortText: string,
    ctaHref: string,
    ctaLabel: string,
    imageSrc: string,
    imageAlt: string,
    objectFit?: 'cover' | 'contain'
}
export const ContactTeaser: React.FC<ContactTeaserProps> = (props) => {
    const {title, shortText, ctaHref, ctaLabel, imageSrc, imageAlt, objectFit = 'contain'} = props
    return (
        <section className={classNames('contact-teaser', 'bg-secondary')}>
            <Container>
                <Row>
                    <Col xs={12} md={6}
                         className={classNames(styles.contactTeaser__image, "d-sm-inline-block position-relative")}>

                        <Image src={imageSrc} alt={imageAlt} sizes="50vw"
                               style={{
                                   objectFit: objectFit,
                                   objectPosition: 'left center' // Uncomment if you want to control the position
                               }}
                               fill>
                        </Image>

                    </Col>
                    <Col md={{offset: 1, span: 5}} xs={12} className={classNames('py-5 my-5')}>
                        <header>
                            <Row>
                                <Col xs={12}>
                                    <h2 dangerouslySetInnerHTML={{ __html: title }} />
                                    <hr/>
                                    {shortText ? <h3>{shortText}</h3> : ''}
                                </Col>
                            </Row>
                        </header>
                        {ctaHref ? <Button variant="link" href={ctaHref} className={"mt-4"}>{ctaLabel}</Button> : ''}
                        <Row className={"mt-5"}>
                            <Col sm={6}>
                                biszet GmbH<br/>
                                Genter Straße 26 · 50672 Köln Germany
                            </Col>
                            <Col sm={6}>
                                <a href={"tel:+49221518008"} className={"text-dark"}>phone: +49 221 51 80 08</a><br/><a
                                href={"mailto:info@biszet.de"} className={"text-dark"}>info@biszet.de</a>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}