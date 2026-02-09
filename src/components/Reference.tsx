import classNames from "classnames";
import styles from "@/components/ImageSplit.module.scss";
import {Col, Container, Row} from "react-bootstrap";
import {Title} from "@/components/Title";
import Image from "next/image";
import React from "react";
import VideoPlayer from "@/components/VideoPlayer";

export type ReferenceProps = {
    title: string,
    shortText: string,
    description: string,
    videoSrc: string,
    videoPosterSrc: string,
    videoCaption: string
}
export const Reference: React.FC<ReferenceProps> = (props) => {
    const {title, shortText, description, videoCaption, videoSrc, videoPosterSrc} = props
    return (
        <section className={"reference bg-turkis text-dark py-5"} data-bs-theme="light">
            <Container className={"py-5"}>
                <Row>
                    <Col xs={12} md={{offset: 1, span: 5}} className={"mb-5"}>
                        <Title title={title} shortText={shortText} full></Title>
                        {description}
                    </Col>
                    <Col xs={12} md={{offset: 1, span: 4}}>
                        <figure>
                            <VideoPlayer
                                src={videoSrc}
                                poster={videoPosterSrc}
                                loop={true}
                            />
                            <figcaption>{videoCaption}</figcaption>
                        </figure>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}