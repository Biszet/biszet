'use client'
import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';
import {Col, Container, Row} from "react-bootstrap";
import React from "react";
import styles from './Carousel.module.scss'
import classNames from "classnames";
import {useWindowSize} from "@/components/Carousel.hooks";

export type CarouselCard = {
    title: string,
    description: string,
    imageSrc: string,
    imageAlt: string
}

export type CarouselCardSet = Array<CarouselCard>
export type CarouselItems = Array<CarouselCardSet>

export type MultiItemCarouselProps = {
    title?: string,
    items: CarouselItems,
    showItemTitles?: boolean // NEU: Optionaler Schalter
}

const MultiItemCarousel: React.FC<MultiItemCarouselProps> = ({title, items, showItemTitles = false}) => {

    const {width} = useWindowSize();
    const isMobile = width! <= 768;

    return (
        <section className={'carousel my-5'}>
            <Container fluid className={classNames(styles.carousel)}>
                {title ? <Row className="justify-content-center mb-5">
                    <Col>
                        <h2
                            className="text-center"
                            dangerouslySetInnerHTML={{ __html: title }}
                        />
                    </Col>
                </Row> : ''}
                <Carousel interval={5000}>
                    {isMobile ? (
                        // Mobile View
                        items.flat().map((item, index) => (
                            <Carousel.Item key={index}>
                                <Container>
                                    <Row>
                                        <Col xs={{offset: 1, span: 10}}>
                                            <Row>
                                                <Col xs={12} className="d-flex justify-content-center">
                                                    <Card key={index} className={classNames(styles.carousel__card, 'text-center')}>
                                                        <Card.Img variant="top" src={item.imageSrc} alt={item.imageAlt} loading="lazy" className={styles.carousel__image}/>
                                                        <Card.Body>
                                                            {/* H3 nur anzeigen, wenn showItemTitles=true */}
                                                            {showItemTitles && item.title && (
                                                                <h3 className="h5 mt-3 mb-3">{item.title}</h3>
                                                            )}
                                                            {item.description &&
                                                                <Card.Text>{item.description}</Card.Text>}
                                                        </Card.Body>
                                                    </Card>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Container>
                            </Carousel.Item>
                        ))
                    ) : (
                        // Desktop View
                        items.map((slide, slideIndex) => (
                            <Carousel.Item key={slideIndex}>
                                <Container>
                                    <Row>
                                        <Col xs={{offset: 1, span: 10}}>
                                            <Row className="gx-5">
                                                {slide.map((item, itemIndex) => (
                                                    <Col key={itemIndex} xs={12} md={4} className="mb-4 mb-md-0">
                                                        <Card className={classNames(styles.carousel__card, 'text-center')}>
                                                            <Card.Img variant="top" src={item.imageSrc} alt={item.imageAlt} loading="lazy" className={styles.carousel__image}/>
                                                            <Card.Body>
                                                                {/* H3 nur anzeigen, wenn showItemTitles=true */}
                                                                {showItemTitles && item.title && (
                                                                    <h3 className="h5 mt-3 mb-3">{item.title}</h3>
                                                                )}
                                                                {item.description &&
                                                                    <Card.Text>{item.description}</Card.Text>}
                                                            </Card.Body>
                                                        </Card>
                                                    </Col>
                                                ))}
                                            </Row>
                                        </Col>
                                    </Row>
                                </Container>
                            </Carousel.Item>
                        ))
                    )}
                </Carousel>
            </Container>
        </section>
    );
};

export default MultiItemCarousel;