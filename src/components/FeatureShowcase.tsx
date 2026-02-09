import React from "react";
import {MultiItemCarouselProps} from "@/components/Carousel";
import {Title} from "@/components/Title";
import {Button, Col, Container, Row} from "react-bootstrap";
import Image from "next/image";
import classNames from "classnames";
import styles from './FeatureShowcase.module.scss'
import Link from "next/link";


export type FeatureShowcaseProps = {
    title: string,
    shortText: string,
    imageSrc: string,
    imageAlt: string,
    description: string
    ctaHref: string,
    ctaLabel: string,
    downloadHref?: string,
    downloadLabel?: string,
    first?: boolean,
    isHeading?: boolean,
    backgroundColor?: 'turkis' | 'secondary',
}

export const FeatureShowcase: React.FC<FeatureShowcaseProps> = (props) => {

    const {title, shortText, description, imageAlt, imageSrc, ctaLabel, ctaHref, first, isHeading, downloadLabel, downloadHref, backgroundColor = 'turkis'} = props
    const backgroundClass = backgroundColor === 'turkis' ? 'bg-turkis' : 'bg-secondary';
    
    return (
        <section className={classNames('feature-showcase', backgroundClass, first ? styles.feature_showcase__first : '')}>
            <Container className={'py-5'}>
                <Row className={"py-5"}>
                    <Col>
                        <Title isHeading={isHeading} title={title} shortText={shortText} full></Title>
                    </Col>
                </Row>
                <Row className={"py-5"}>
                    <Col sm={12} md={5} className={"d-flex flex-column justify-content-center align-items-center"}>

                        <Image src={imageSrc} alt={imageAlt} sizes="100vw"
                               style={{
                                   width: '100%',
                                   height: 'auto',
                               }}
                               width={500}
                               height={300}>
                        </Image>
                        {downloadLabel && <Row>
                            <Col className={"py-5"}>
                                <Button variant="link" href={downloadHref} >{downloadLabel}</Button>
                            </Col>
                        </Row>}
                    </Col>
                    <Col sm={12} md={{offset: 1, span: 5}}>
                        <div dangerouslySetInnerHTML={{__html: description}}></div>
                        {ctaHref ?  <Button variant="link" href={ctaHref} className={"mt-5"}>{ctaLabel}</Button> : ''}
                    </Col>
                </Row>

            </Container>
        </section>
    )
}