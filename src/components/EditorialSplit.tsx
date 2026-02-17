'use client';

import React, {JSX, ReactNode, useEffect, useRef, useState} from "react";
import styles from './EditorialSplit.module.scss'
import Image from "next/image";
import {Button, Col, Container, Row} from "react-bootstrap";
import {Title} from "@/components/Title";
import classNames from "classnames";

export type EditorialSplitProps = {
    title: string,
    shortText?: string,
    imageSrc: string,
    videoSrc?: string,
    imageSrcMobile?: string,
    imageAlt: string,
    description?: string,
    children?: ReactNode,
    ctaHref?: string,
    ctaLabel?: string,
    flip?: boolean,
    variant?: 'default' | 'subtle' | 'overlay' | 'background',
    overlayColor?: 'turkis' | 'secondary' | 'white',
    imageType?: 'image' | 'gif' | 'video',
    logos?: Array<{
        src: string,
        alt: string,
        href?: string
    }>
}

export const EditorialSplit: React.FC<EditorialSplitProps> = (props) => {
    const {title, shortText, description, imageAlt, imageSrc, videoSrc, imageSrcMobile, ctaLabel, ctaHref, flip, children, variant, overlayColor = 'turkis', imageType = 'image', logos} = props

    const containerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    const [shouldLoadVideo, setShouldLoadVideo] = useState(false);

    // 1. LOADER LOGIK
    useEffect(() => {
        if (imageType !== 'video') return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setShouldLoadVideo(true);
                    observer.disconnect();
                }
            },
            { rootMargin: '200px' }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, [imageType]);

    // 2. FIX FÜR MOBILE AUTOPLAY (Muted erzwingen)
    useEffect(() => {
        if (shouldLoadVideo && videoRef.current) {
            // WICHTIG: Das hier repariert den Bug!
            // Wir setzen die Property direkt am DOM-Element, weil React das Attribut manchmal "verschluckt".
            videoRef.current.muted = true;
            videoRef.current.defaultMuted = true;

            // Versuchen direkt zu starten
            videoRef.current.play().catch(e => console.log("Initial Play attempt", e));
        }
    }, [shouldLoadVideo]);

    // 3. PAUSE LOGIK (Performance)
    useEffect(() => {
        if (!shouldLoadVideo || imageType !== 'video') return;

        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                const video = videoRef.current;

                if (!video) return;

                if (entry.isIntersecting) {
                    // Sicherstellen, dass es wirklich stumm ist, bevor wir play rufen
                    if (!video.muted) video.muted = true;

                    video.play().catch(e => console.log("Autoplay blocked", e));
                } else {
                    video.pause();
                }
            },
            { threshold: 0.5 }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, [shouldLoadVideo, imageType]);


    if (variant === 'background') {
        return (
            <section className={classNames('editorial-split', styles.editorialSplit__background)} ref={containerRef}>

                {/* FALL A: VIDEO */}
                {imageType === 'video' ? (
                    <div className={styles.editorialSplit__gifContainer}>
                        <Image
                            src={imageSrc}
                            alt={imageAlt}
                            fill
                            className={styles.editorialSplit__videoPoster}
                            style={{ objectFit: 'cover', zIndex: 1 }}
                        />

                        {shouldLoadVideo && videoSrc && (
                            <video
                                ref={videoRef}
                                autoPlay
                                loop
                                muted
                                playsInline
                                // @ts-ignore
                                defaultMuted={true} // React-spezifisch
                                className={styles.editorialSplit__video}
                                style={{
                                    objectFit: 'cover',
                                    zIndex: 2,
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%'
                                }}
                            >
                                <source src={videoSrc} type="video/mp4" />
                                <source src={videoSrc} />
                            </video>
                        )}
                    </div>
                ) : imageType === 'gif' ? (
                    <div className={styles.editorialSplit__gifContainer}>
                        <img src={imageSrc} alt={imageAlt} className={styles.editorialSplit__gif} />
                    </div>
                ) : (
                    <div className={styles.editorialSplit__backgroundImageContainer}>
                        <Image src={imageSrc} alt={imageAlt} fill
                               className={imageSrcMobile ? styles.editorialSplit__backgroundImage_desktop : ''}
                               style={{ objectFit: 'cover', objectPosition: 'center center' }}
                        />
                        {imageSrcMobile && (
                            <Image src={imageSrcMobile} alt={imageAlt} fill
                                   className={styles.editorialSplit__backgroundImage_mobile}
                                   style={{ objectFit: 'cover', objectPosition: 'center center' }}
                            />
                        )}
                    </div>
                )}

                <div className={classNames(
                    styles.editorialSplit__backgroundOverlay,
                    overlayColor === 'secondary' ? styles.editorialSplit__backgroundOverlay_secondary :
                    overlayColor === 'white' ? styles.editorialSplit__backgroundOverlay_white :
                    styles.editorialSplit__backgroundOverlay_turkis
                )} />

                <Container className={classNames('py-5', styles.editorialSplit__backgroundContent)}>
                    <Row>
                        <Col sm={12} md={12} lg={6} className={classNames('py-5 d-flex')}>
                            <div className="align-self-center w-100">
                                <Title title={title} full shortText={shortText}></Title>
                                {description ? <div dangerouslySetInnerHTML={{__html: description}}></div> : ''}
                                {children}
                                {ctaHref ? <Button variant="link" href={ctaHref} className={"mt-5"}>{ctaLabel}</Button> : ''}

                                {logos && logos.length > 0 && (
                                    <div className={classNames(styles.editorialSplit__logos)}>
                                        <Row>
                                            {logos.slice(0, 3).map((logo, index) => (
                                                <Col key={index} xs={4} className="text-left">
                                                    <div style={{ position: 'relative', width: '100%', height: '50px' }}>
                                                        {logo.href ? (
                                                            <a href={logo.href} target="_blank" rel="noopener noreferrer">
                                                                <Image src={logo.src} alt={logo.alt} fill className={styles.editorialSplit__logo} style={{ objectFit: 'contain', objectPosition: 'left center' }} />
                                                            </a>
                                                        ) : (
                                                            <Image src={logo.src} alt={logo.alt} fill className={styles.editorialSplit__logo} style={{ objectFit: 'contain', objectPosition: 'left center' }} />
                                                        )}
                                                    </div>
                                                </Col>
                                            ))}
                                            <Col md={3} className="d-none d-md-block"></Col>
                                        </Row>
                                    </div>
                                )}
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        )
    }

    return (
        <section className={classNames('editorial-split', variant === 'subtle' ? "bg-light-subtle" : '', 'py-5')}>
            <Container className={'py-5'}>
                <Row>
                    <Col sm={12} md={5} className={classNames('mb-5', styles.editorialSplit__content, flip ? 'order-md-last' : '', 'd-flex')}>
                        <div className="align-self-center w-100">
                            <Title title={title} full shortText={shortText}></Title>
                            {description ? <div dangerouslySetInnerHTML={{__html: description}}></div> : ''}
                            {children}
                            {ctaHref ? <Button variant="link" href={ctaHref} className={"mt-5"}>{ctaLabel}</Button> : ''}
                        </div>
                    </Col>
                    <Col sm={12} md={{offset: 1, span: 5}} className={classNames(flip ? 'order-md-first' : '', 'd-flex align-items-center')}>
                        <div className={classNames(
                            styles.editorialSplit__imageContainer,
                            variant === 'overlay' ? styles.editorialSplit__imageContainer_overlay : '',
                            imageType === 'gif' ? styles.editorialSplit__gif : ''
                        )}>
                            {imageType === 'gif' ? (
                                <img src={imageSrc} alt={imageAlt} className={styles.editorialSplit__gif} />
                            ) : (
                                <Image src={imageSrc} alt={imageAlt} sizes="(max-width: 768px) 100vw, 50vw"
                                       className={imageSrcMobile ? styles.editorialSplit__image_desktop : ''}
                                       style={{ width: '100%', height: 'auto', objectFit: 'cover', objectPosition: variant === 'overlay' ? '400px center' : 'center center' }}
                                       width={500} height={300}
                                />
                            )}
                            
                            {imageSrcMobile && imageType !== 'gif' && (
                                <Image src={imageSrcMobile} alt={imageAlt} sizes="100vw"
                                       className={styles.editorialSplit__image_mobile}
                                       style={{ width: '100%', height: 'auto', objectFit: 'cover', objectPosition: 'center center' }}
                                       width={500} height={300}
                                />
                            )}
                            
                            {variant === 'overlay' && <div className={classNames(
                                styles.editorialSplit__overlay,
                                overlayColor === 'secondary' ? styles.editorialSplit__overlay_secondary :
                                overlayColor === 'white' ? styles.editorialSplit__overlay_white :
                                styles.editorialSplit__overlay_turkis
                            )} />}
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}