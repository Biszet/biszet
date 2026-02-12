'use client'
import React, {FormEvent, useState} from "react";
import styles from './Contact.module.scss'
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {Title} from "@/components/Title";
import classNames from "classnames";

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
        } else {
            // Phone aus dem Daten-Objekt entfernt
            const data = {name, email, message, aware, consent: consent ? 'true' : 'false'}
            fetch("/", {
                method: "POST",
                headers: {"Content-Type": "application/x-www-form-urlencoded"},
                // @ts-ignore
                body: encode({"form-name": "contact", ...data}),
            })
                .then(() => {
                    window.location.href = formSubmitThankYouUrl;
                })
                .catch(error => alert("Error: " + error));
        }

        setValidated(true);
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
                        <h2>{formTitle}</h2>
                    </Col>
                    <Col sm={12} md={6} className={"mb-5 pb-5"}>
                        <Form method="post" noValidate validated={validated} name="contact" onSubmit={handleSubmit}
                              data-netlify="true" netlify-honeypot="bot-field">
                            <input type="hidden" name="form-name" value="contact"/>
                            <p className="visually-hidden" aria-hidden={true}>
                                <label>Don’t fill this out if you’re human: <input name="bot-field"
                                                                                   tabIndex={-1}/></label>
                            </p>
                            <Form.Group className="mb-3" controlId="formName">
                                <Form.Label>{formFieldNameLabel}*</Form.Label>
                                <Form.Control type="text" placeholder={formFieldNamePlaceholder} name="name"
                                              required
                                              onChange={e => setName(e.target.value)}/>
                                <Form.Control.Feedback type="invalid">
                                    {formFieldNameError}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formEmail">
                                <Form.Label>{formFieldEmailLabel}*</Form.Label>
                                <Form.Control type="email" placeholder={formFieldEmailPlaceholder} name="email"
                                              required
                                              onChange={e => setEmail(e.target.value)}/>
                                <Form.Control.Feedback type="invalid">
                                    {formFieldEmailError}
                                </Form.Control.Feedback>
                            </Form.Group>

                            {/* Telefon Form.Group wurde hier entfernt */}

                            <Form.Group className="mb-3" controlId="formAware">
                                <Form.Label>{formFieldAwareLabel}</Form.Label>
                                <Form.Control type="text" placeholder={formFieldAwarePlaceholder} name="aware"
                                              onChange={e => setAware(e.target.value)}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formMessage">
                                <Form.Label>{formFieldMessageLabel}*</Form.Label>
                                <Form.Control as="textarea" rows={3} required name="message"
                                              placeholder={formFieldMessagePlaceholder}
                                              onChange={e => setMessage(e.target.value)}></Form.Control>
                                <Form.Control.Feedback type="invalid">
                                    {formFieldMessageError}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Text>
                                {formCaption}
                            </Form.Text>
                            <Form.Group className="mb-3" controlId="formConsent">
                                <Form.Check type="checkbox" label={`${formFieldConsentLabel}*`} name="consent"
                                            onChange={e => setConsent(e.target.checked)}
                                            required/>
                                <Form.Control.Feedback type="invalid">
                                    {formFieldConsentError}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Button variant="link" type="submit" className={"align-content-end btn-lg"}>
                                {formSubmitLabel}
                            </Button>
                        </Form>
                    </Col>
                    <Col sm={12} md={{offset: 1, span: 4}} className={""}>
                        <div>
                            <address>
                                biszet GmbH<br/>
                                Genter Str. 26 • 50672 Köln<br/>
                                Germany
                            </address>
                            <h3 className="mt-5 mb-0">{mailTitle}</h3>
                            <Button variant="link" href="mailto: info@biszet.de">info@biszet.de</Button>
                            <h3 className="mt-5 mb-0">{phoneTitle}</h3>
                            <Button variant="link" href="tel: +49221518008">+49 221 51 80 08</Button>
                        </div>
                    </Col>
                </Row>

            </Container>
        </section>
    )
}