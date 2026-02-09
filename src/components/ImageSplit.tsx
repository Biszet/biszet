import React, {JSX} from "react";
import {Col, Container, Figure, Row} from "react-bootstrap";
import {Title} from "@/components/Title";
import Image from "next/image";
import classNames from "classnames";
import styles from "@/components/ImageSplit.module.scss";

export type ImageSplitProps = {
    title: string,
    imageSrc1: string,
    imageSrc2: string,
    imageAlt1: string,
    imageAlt2: string,
    imageCaption1: string,
    imageCaption2: string,
    first?: boolean,
    isHeading?: boolean,
}

export const ImageSplit: React.FC<ImageSplitProps> = (props) => {
    const {title, imageSrc1, imageSrc2, imageAlt2, imageAlt1, imageCaption2, imageCaption1, first, isHeading} = props
    return (
        <Container as="section" className={classNames('image-split', first ? styles.image_split__first : '', 'mb-5')}>
            <Row>
                <Col sm={12} className={"mb-5"}>
                    <Title isHeading={isHeading} title={title} full></Title>
                </Col>
                <Col xs={6} md={6}>
                    <figure className="figure">
                        <Image src={imageSrc1} alt={imageAlt1} sizes="(max-width: 768px) 100vw, 50vw"
                               priority={first}
                               style={{
                                   width: '100%',
                                   height: 'auto',
                               }}
                               width={500}
                               height={300}>
                        </Image>
                        <figcaption className="figure-caption mt-3">
                            {imageCaption1 ?
                                <div dangerouslySetInnerHTML={{__html: imageCaption1}}></div> : ''}</figcaption>
                    </figure>
                </Col>
                <Col xs={6} md={6}>
                    <figure className="figure">
                        <Image src={imageSrc2} alt={imageAlt2} sizes="(max-width: 768px) 100vw, 50vw"
                               priority={first}
                               style={{
                                   width: '100%',
                                   height: 'auto',
                               }}
                               width={500}
                               height={300}>
                        </Image>
                        <figcaption className="figure-caption mt-3">
                            {imageCaption2 ? <div dangerouslySetInnerHTML={{__html: imageCaption2}}></div> : ''}
                        </figcaption>
                    </figure>
                </Col>
            </Row>
        </Container>
    )
}