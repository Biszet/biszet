'use client'
import React, {FormEvent, useState} from "react";
import styles from './Contact.module.scss'
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {Title} from "@/components/Title";
import classNames from "classnames";
import Image from "next/image";

export type ContactProps = {
    title: string,
    description: string,
    formTitle: string,
    formFieldNameLabel: string,
    formFieldNamePlaceholder: string,
    formFieldNameError: string,
    formFieldAwarePlaceholder: string,
    formFieldAwareLabel: string,
    formFieldEmailLabel: string,
    formFieldEmailPlaceholder: string,
    formFieldEmailError: string,
    // Telefon-Props entfernt
    formFieldMessageLabel: string,
    formFieldMessagePlaceholder: string,
    formFieldMessageError: string,
    formFieldConsentLabel: string,
    formFieldConsentError: string,
    formSubmitLabel: string,
    formSubmitThankYouUrl: string,
    formCaption: string,
    mailTitle: string,
    phoneTitle: string,
}

const encode = (data: any) => {
    return Object.keys(data)
        .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
        .join("&");
};

export const Contact: React.FC<ContactProps> = (props) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    // const [phone, setPhone] = useState(''); // Entfernt
    const [aware, setAware] = useState('');
    const [message, setMessage] = useState('');
    const [consent, setConsent] = useState(false);
    const {
        title,
        description,
        formTitle,
        mailTitle,
        phoneTitle,
        formSubmitLabel,
        formFieldEmailLabel,
        formFieldEmailPlaceholder,
        formFieldAwareLabel,
        formFieldAwarePlaceholder,
        formFieldEmailError,
        // Phone Props entfernt
        formFieldNameLabel,
        formFieldNamePlaceholder,
        formFieldNameError,
        formFieldMessageLabel,
        formFieldMessagePlaceholder,
        formFieldMessageError,
        formFieldConsentLabel,
        formFieldConsentError,
        formSubmitThankYouUrl,
        formCaption
    } = props

    const [validated, setValidated] = useState(false);

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        const form = event.currentTarget as unknown as HTMLFormElement;

        if (form.checkValidity() === false) {
            event.stopPropagation();
            setValidated(true);
        } else {
            const data = {name, email, message, aware, consent: consent ? 'true' : 'false'}

            fetch(window.location.pathname, {
                method: "POST",
                headers: {"Content-Type": "application/x-www-form-urlencoded"},
                body: encode({"form-name": "contact", "bot-field": "", ...data}),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`Netlify lehnte die Anfrage ab (Status: ${response.status})`);
                    }
                    window.location.href = formSubmitThankYouUrl;
                })
                .catch(error => alert("Es gab einen Fehler beim Senden: " + error));
        }
    };

    return (
        <section
            className={classNames(styles.contact__first, 'bg-secondary')}>
            <Container>
                <Row>
                    <Col sm={12}>
                        <Title isHeading title={title} full></Title>
                        {description ? <div dangerouslySetInnerHTML={{__html: description}}></div> : ''}
                    </Col>
                    <Col sm={12} className={"mt-5 pt-5"}>
                        <h2>{mailTitle}</h2>
                    </Col>
                    <Col sm={12} md={6} className={"mb-5 pb-5"}>

                        <Button className="biszet-call-to-action" variant="link" href="mailto: info@biszet.de">info@biszet.de
                            <Image
                            alt={"Biszet Logo"}
                            src={"/images/envelope-mail.svg"}
                            width="50"
                            height="40"
                            className="d-inline-block"
                        />
                        </Button>

                    </Col>
                    <Col sm={12} md={{offset: 1, span: 4}} className={"mb-5"}>
                        <div>
                            <address>
                                biszet GmbH<br/>
                                Genter Str. 26 • 50672 Köln<br/>
                                Germany
                            </address>
                            <h3 className="mt-5 mb-0">{phoneTitle}</h3>
                            <Button variant="link" href="tel: +49221518008">+49 221 51 80 08</Button>
                        </div>
                    </Col>
                </Row>

            </Container>
        </section>
    )
}