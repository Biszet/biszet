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

    // Refs
    const containerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null); // NEU: Referenz zum Video-Player

    // State
    const [shouldLoadVideo, setShouldLoadVideo] = useState(false);

    // --- 1. LOADER LOGIK (Lädt das Video 200px bevor es sichtbar wird) ---
    useEffect(() => {
        if (imageType !== 'video') return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setShouldLoadVideo(true); // Rendert das Video-Tag in den DOM
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

    // --- 2. PLAYER LOGIK (Startet erst bei 50% Sichtbarkeit) ---
    useEffect(() => {
        // Wir beobachten erst, wenn das Video geladen wurde
        if (!shouldLoadVideo || imageType !== 'video') return;

        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                const video = videoRef.current;

                if (!video) return;

                if (entry.isIntersecting) {
                    // Wenn >50% sichtbar -> Play
                    video.play().catch(e => console.log("Autoplay blocked", e));
                } else {
                    // Wenn <50% sichtbar -> Pause (optional, spart Ressourcen)
                    video.pause();
                }
            },
            { threshold: 0.5 } // WICHTIG: 50% muss sichtbar sein
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, [shouldLoadVideo, imageType]);


    // BACKGROUND VARIANTE
    if (variant === 'background') {
        return (
            <section className={classNames('editorial-split', styles.editorialSplit__background)} ref={containerRef}>

                {/* FALL A: VIDEO */}
                {imageType === 'video' ? (
                    <div className={styles.editorialSplit__gifContainer}>
                        {/* Poster Image */}
                        <Image
                            src={imageSrc}
                            alt={imageAlt}
                            fill
                            className={styles.editorialSplit__videoPoster}
                            style={{ objectFit: 'cover', zIndex: 1 }}
                        />

                        {/* Video Player */}
                        {shouldLoadVideo && videoSrc && (
                            <video
                                ref={videoRef} // NEU: Ref verknüpfen
                                // autoPlay entfernt! Wir steuern das jetzt manuell.
                                muted
                                playsInline
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
                    // FALL B: GIF (Legacy)
                    <div className={styles.editorialSplit__gifContainer}>
                        <img src={imageSrc} alt={imageAlt} className={styles.editorialSplit__gif} />
                    </div>
                ) : (
                    // FALL C: Statisches Bild
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

    // STANDARD VARIANTE
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