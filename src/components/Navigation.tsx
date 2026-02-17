'use client'
import Nav from "react-bootstrap/Nav";
import {Container, Navbar, Dropdown} from "react-bootstrap";
import {LanguageChooser} from "@/components/LanguageChooser";
import styles from './Navigation.module.scss'
import classNames from "classnames";
import Image from "next/image";
import {usePathname, useRouter} from 'next/navigation'
import {useEffect, useState} from "react";

// NEU: Erweiterte Props für dynamische Daten
type NavigationProps = {
    current: string;
    logo?: {
        src: string;
        alt: string;
    };
    articles?: Record<string, any>; // Die Liste der Artikel aus der JSON
    slugMap?: Record<string, string>; // Die Übersetzungs-Tabelle für den Sprachwechsler
}

export const Navigation = ({current, logo, articles, slugMap}: NavigationProps) => {

    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname()
    const router = useRouter()

    useEffect(() => {
        const dummyElement = document.createElement('div');
        dummyElement.style.position = 'absolute';
        dummyElement.style.top = '100px';
        dummyElement.style.height = '1px';
        dummyElement.style.width = '100%';
        document.body.appendChild(dummyElement);

        const observer = new IntersectionObserver((entries) => {
            const [entry] = entries;
            setIsScrolled(!entry.isIntersecting);
        }, {
            root: null,
            threshold: 0
        });

        observer.observe(dummyElement);

        return () => {
            observer.disconnect();
            if (document.body.contains(dummyElement)) {
                document.body.removeChild(dummyElement);
            }
        };
    }, []);

    // 1. Logik für den Basis-Pfad (DE=wissen, EN=knowledge)
    const isDe = current === 'de';
    const basePath = isDe ? 'wissen' : 'knowledge';

    return (
        <>
            <header style={{
                position: 'fixed',
                top: 0,
                zIndex: 100,
                width: '100%',
                backgroundColor: isScrolled ? '#fff' : 'transparent',
                transition: 'background-color 1s'
            }}>
                <Navbar expand="lg">
                    <Container>
                        <Navbar.Brand href={`/${current}`}>
                            <Image
                                priority
                                alt={logo?.alt || "biszet Logo – Der luxuriöse Kosmetik Kühlschrank"}
                                src={logo?.src || "/images/logos/biszet-logo-kosmetik-kuehlschrank.svg"}
                                width="120"
                                height="50"
                                className="d-inline-block align-top"
                            />
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                        <Navbar.Collapse id="basic-navbar-nav" className={classNames(styles.navigation__collapse)}>
                            <Nav className="justify-content-center align-items-center" activeKey={pathname}>
                                <Nav.Link href={`/${current}`}>home</Nav.Link>
                                <Nav.Link href={`/${current}/technology`}>{isDe ? 'technik' : 'technology'}</Nav.Link>
                                <Nav.Link href={`/${current}/story`}>story</Nav.Link>

                                {/* DYNAMISCHES DROPDOWN */}
                                <Dropdown
                                    as={Nav.Item}
                                    className={styles.hoverDropdown}
                                >
                                    <Dropdown.Toggle
                                        as={Nav.Link}
                                        // Linkt dynamisch auf /de/wissen oder /en/knowledge
                                        href={`/${current}/${basePath}`}
                                        id="knowledge-dropdown"
                                        // Aktiv, wenn URL 'wissen' ODER 'knowledge' enthält
                                        active={pathname?.includes('/wissen') || pathname?.includes('/knowledge')}
                                        onClick={(e) => {
                                            if (window.innerWidth >= 992) {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                router.push(`/${current}/${basePath}`);
                                            }
                                        }}
                                    >
                                        {isDe ? 'wissen' : 'knowledge'}
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu renderOnMount={true}>
                                        {/* Link zur Übersicht */}
                                        <Dropdown.Item
                                            href={`/${current}/${basePath}`}
                                            className="d-lg-none fw-bold"
                                            onClick={() => router.push(`/${current}/${basePath}`)}
                                        >
                                            {isDe ? 'Alle Artikel' : 'All Articles'}
                                        </Dropdown.Item>

                                        <Dropdown.Divider className="d-lg-none" />

                                        {/* HIER IST DIE MAGIE: Automatische Generierung der Links */}
                                        {articles && Object.entries(articles).map(([key, article]: [string, any]) => (
                                            <div key={key}>
                                                <Dropdown.Item href={`/${current}/${basePath}/${article.slug}`}>
                                                    {article.navLabel || article.title}
                                                </Dropdown.Item>
                                                <Dropdown.Divider />
                                            </div>
                                        ))}
                                    </Dropdown.Menu>
                                </Dropdown>

                                <Nav.Link href={`/${current}/contact`}>{isDe ? 'kontakt' : 'contact'}</Nav.Link>

                            </Nav>

                            {/* Wir reichen die SlugMap an den LanguageChooser weiter */}
                            <LanguageChooser
                                className="ms-lg-3 mt-lg-0 mt-sm-3 language-switch"
                                current={current}
                                slugMap={slugMap}
                            />
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </header>
        </>
    );
};