import React, {JSX, ReactNode} from "react";
import {Col, Container, Row} from "react-bootstrap";
import {Title} from "@/components/Title";
import classNames from "classnames";

export type EditorialSplitProps = {
    title: string,
    children?: ReactNode,
    variant?: string
}

export const EditorialText: React.FC<EditorialSplitProps> = (props) => {
    const {title, children, variant} = props
    return (
        <section
            className={classNames('editorial-text', variant === 'subtle' ? "bg-light-subtle" : 'bg-secondary', 'py-5' )}>
            <Container className={'py-5'}>
                <Row>
                    <Col sm={12} md={{offset: 1, span: 10}} >
                        <Title title={title} isHeading full></Title>
                        {children}
                    </Col>
                </Row>
            </Container>
        </section>
    )
}
