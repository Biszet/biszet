import React from "react";
import {Button, Col, Container, Row} from "react-bootstrap";
import classNames from "classnames";


export type TextTeaserProps = {
    title: string,
    ctaHref: string,
    ctaLabel: string,
    variant?: string,
    quoteImageSrc?: string,
    quoteImageAlt?: string,
    backgroundColor?: 'turkis' | 'secondary',
}
export const TextTeaser: React.FC<TextTeaserProps> = (props) => {
    const {title, ctaHref, ctaLabel, variant, quoteImageSrc, quoteImageAlt, backgroundColor} = props
    
    const backgroundClass = backgroundColor === 'secondary' ? 'bg-secondary' : backgroundColor === 'turkis' ? 'bg-turkis' : '';
    // Keep legacy variant support for backward compatibility
    const legacyBackgroundClass = variant === 'secondary' ? 'bg-secondary' : '';
    const finalBackgroundClass = backgroundColor ? backgroundClass : legacyBackgroundClass;
    
    return (
        <section className={classNames('text-teaser', finalBackgroundClass, 'py-5')}>
            <Container className={classNames('py-5')}>
                <Row className={"align-items-center text-center"}>
                    <Col xs={12} sm={{offset: 3, span: 6}}>
                        <h2 style={{textWrap: "balance"}}>
                            <div dangerouslySetInnerHTML={{__html: title}}></div>
                            {quoteImageSrc && <img src={quoteImageSrc} alt={quoteImageAlt} width="100"/>}
                        </h2>
                        <hr/>
                        {ctaHref ? <Button variant="link" href={ctaHref}
                                           className={"mt-5 justify-content-center"}>{ctaLabel}</Button> : ''}
                    </Col>
                </Row>
            </Container>
        </section>
    )
}