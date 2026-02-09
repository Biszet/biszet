'use client'

import Nav from "react-bootstrap/Nav";
import {Container} from "react-bootstrap";
import classNames from "classnames";
import styles from './Footer.module.scss'
import Image from "next/image";

// 1. Props Definition erweitern
export type FooterProps = {
    current: string;
    logo?: {
        src: string;
        alt: string;
    }
}

// 2. Destrukturierung der Props (Logo hinzufügen)
export const Footer = ({current, logo}: FooterProps) => {
    return (
        <footer className={classNames('bg-dark')}>
            <Container as={"section"} className="text-white py-3">
                <div className={'d-flex justify-content-between align-items-center'}>
                    {/* 3. Dynamisches Bild mit Fallback */}
                    <Image
                        alt={logo?.alt || "Biszet Logo"}
                        src={logo?.src || "/images/logo-white.svg"}
                        width="100"
                        height="50"
                        className="d-inline-block align-top"
                    />
                    <Nav className="justify-content-end nav-dark flex-column flex-sm-row gap-0">
                        <Nav.Link href={`/${current}/imprint`}
                                  className={classNames("text-white", styles.footer__link)}>{current === 'de' ? 'impressum' : 'imprint'}</Nav.Link>
                        <Nav.Link href={`/${current}/dataprotection`}
                                  className={classNames("text-white", styles.footer__link)}>{current === 'de' ? 'datenschutz' : 'data protection'}</Nav.Link>
                        <Nav.Link href={`/${current}/contact`}
                                  className={classNames("text-white", styles.footer__link)}>{current === 'de' ? 'kontakt' : 'contact'}</Nav.Link>
                    </Nav>
                </div>
            </Container>
        </footer>
    )
}