'use client'
import React, {useEffect, useState} from 'react';
import {Button, Col, Container, Row} from 'react-bootstrap';
import Cookies from 'js-cookie';
import styles from './CookieConsent.module.scss'
import classNames from "classnames";

const COOKIE_NAME = 'user_consent';
const COOKIE_EXPIRE_DAYS = 365;

interface CookieConsentProps {
    current: string;
}

const CookieConsent: React.FC<CookieConsentProps> = ({current}) => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const consent = Cookies.get(COOKIE_NAME);
        if (!consent) {
            setShow(true);
        }
    }, []);

    const handleAccept = () => {
        Cookies.set(COOKIE_NAME, 'true', {expires: COOKIE_EXPIRE_DAYS});
        setShow(false);
    };

    if (!show) return null;

    return (
        <div className={classNames(styles.cookieConsentBanner, styles.fadeIn)}>
            <Container>
                <Row className="align-items-center">
                    <Col xs={12} md={9}>
                        {current === 'en' && <p>
                            In order to optimize our website for you and to be able to continuously improve it, we use
                            cookies.
                            By continuing to use the website, you agree to the use of cookies. <a href="/en/dataprotection"
                                                                                                  title="dataprotection">More</a>
                        </p>
                        }
                        {current === 'de' && <p>
                            Um unsere Webseite für Sie optimal zu gestalten und fortlaufend verbessern zu können,
                            verwenden wir Cookies. Durch die weitere Nutzung der Webseite stimmen Sie der Verwendung von
                            Cookies zu. <a href="/de/dataprotection" title="datenschutz">Mehr dazu</a>
                        </p>
                        }
                    </Col>
                    <Col xs={12} md={3} className="text-md-right text-center">
                        <Button onClick={handleAccept} variant="primary">
                            {current === 'en' && <>Understood!</>}
                            {current === 'de' && <>Verstanden!</>}
                        </Button>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default CookieConsent;
