import React, {JSX, ReactNode} from "react";
import styles from './Editorial.module.scss'
import Image from "next/image";
import {Button, Col, Container, Row} from "react-bootstrap";
import {Title} from "@/components/Title";
import classNames from "classnames";

export type EditorialProps = {
    title: string,
    shortText: string,
    image1Src: string,
    image1Alt: string,
    image2Src: string,
    image2Alt: string,
    image3Src: string,
    image3Alt: string,
    description: string,
    description2: string,
    quote?: string,
    quoteImageSrc?: string,
    quoteImageAlt?: string
}

export const Editorial: React.FC<EditorialProps> = (props) => {
    const {
        description,
        description2,
        image1Alt,
        image1Src,
        image2Src,
        image3Alt,
        image3Src,
        title,
        shortText,
        image2Alt,
        quote,
        quoteImageAlt,
        quoteImageSrc
    } = props

    return (
        <section className={classNames("editorial", "bg-secondary py-5")}>
            <Container className={"py-5"}>
                <Row>
                    <Col sm={6}>
                        <Title title={title} full shortText={shortText}></Title>
                    </Col>
                    <Col sm={6}>
                    </Col>
                    <Col sm={12} md={6}>
                        {description ? <div dangerouslySetInnerHTML={{__html: description}}></div> : ''}

                    </Col>
                    <Col sm={12} md={6}>
                        {description2 ? <div dangerouslySetInnerHTML={{__html: description2}}></div> : ''}

                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col sm={6}>
                        <blockquote><strong>{quote}</strong></blockquote>
                        <img src={quoteImageSrc} alt={quoteImageAlt} width="100"/>
                    </Col>
                </Row>
            </Container>
            <Container fluid>
                <Row>
                    <Col sm={12} md={6} lg={6} xl={8} className={styles.editorial__image_column}>
                        <figure>
                            <div className={styles.editorial__image_container}>
                                <Image src={image1Src} alt={image1Alt} sizes="(max-width: 768px) 100vw, 100vw"
                                       style={{
                                           objectFit: "cover",
                                           objectPosition: "right"
                                       }}
                                       fill>
                                </Image>
                            </div>
                            <figcaption>{image1Alt}</figcaption>
                        </figure>
                    </Col>
                    <Col xs={6} md={3} lg={3} xl={2} >
                        <figure>
                            <div className={styles.editorial__image_container}>
                                <Image src={image2Src} alt={image2Alt} sizes="(max-width: 768px) 100vw, 25vw"
                                       style={{
                                           objectFit: "cover",
                                           objectPosition: "left"
                                       }}
                                       fill>
                                </Image>
                            </div>
                            <figcaption>{image2Alt}</figcaption>
                        </figure>
                    </Col>
                    <Col xs={6} md={3} lg={3} xl={2}>
                        <figure>
                            <div className={styles.editorial__image_container}>
                                <Image src={image3Src} alt={image3Alt} sizes="(max-width: 768px) 100vw, 25vw" fill
                                       style={{
                                           objectFit: "cover",
                                           objectPosition: "top center"
                                       }}
                                >
                                </Image>
                            </div>
                            <figcaption>{image3Alt}</figcaption>
                        </figure>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}