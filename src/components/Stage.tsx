import React from 'react';
import Image from "next/image";
import {Container, Button, Row, Col} from 'react-bootstrap';
import styles from './Stage.module.scss'
import classNames from "classnames";

export type StageProps = React.HTMLAttributes<HTMLElement> & {
    subline: string,
    headline: string,
    ctaHref: string,
    ctaLabel: string,
    variant?: 'default' | 'overlay',
    imageSrc?: string,
    imageSrcMobile?: string,
    imageType?: 'image' | 'gif'
}
const Stage: React.FC<StageProps> = (props) => {
    const { variant = 'default', imageSrc, imageSrcMobile, imageType = 'image', ...restProps } = props;
    
    const desktopImage = imageSrc || "/images/Biszet0078-2_Header.jpg";
    const mobileImage = imageSrcMobile || desktopImage;
    
    return (
        <section className={classNames(styles.stage, "shadow")}>
            <div className={classNames(styles.stage__image, imageType === 'gif' && styles.stage__gif)}>
                {/* Desktop Image/GIF */}
                {imageType === 'gif' ? (
                    <img 
                        src={desktopImage}
                        alt="Background"
                        className={styles.stage__image_desktop}
                    />
                ) : (
                    <Image
                        src={desktopImage} 
                        fill
                        priority
                        sizes="100vw"
                        alt="Background"
                        className={styles.stage__image_desktop}
                        style={{
                            objectFit: 'cover',
                            objectPosition: 'center center'
                        }}
                    />
                )}
                
                {/* Mobile Image/GIF */}
                {imageSrcMobile && (
                    imageType === 'gif' ? (
                        <img 
                            src={mobileImage}
                            alt="Background"
                            className={styles.stage__image_mobile}
                        />
                    ) : (
                        <Image
                            src={mobileImage} 
                            fill
                            priority
                            sizes="100vw"
                            alt="Background"
                            className={styles.stage__image_mobile}
                            style={{
                                objectFit: 'cover',
                                objectPosition: 'center center'
                            }}
                        />
                    )
                )}
                {variant === 'overlay' && <div className={styles.stage__overlay} />}
            </div>
            <Container className={styles.stage__content}>
                <Row className={classNames("align-items-center py-sm-5", styles.stage__text)}>
                    <Col xs={12} sm={12} xl={5} className="offset-xl-7">
                        <TextContent {...restProps}/>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

const TextContent: React.FC<StageProps> = ({ctaHref, ctaLabel, headline, subline}) => {
    return (
        <>
            <div className="h2 subline">{subline}</div>
            <h1>{headline}</h1>
            <Button variant="link" href={ctaHref}>{ctaLabel}</Button>
        </>
    );
};


export default Stage;