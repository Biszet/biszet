import React from "react";
import {StageProps} from "@/components/Stage";
import {Col, Row} from "react-bootstrap";


export type TitleProps = {
    title: string,
    shortText?: string
    full?: boolean,
    eighth?: boolean,
    isHeading?: boolean
}
export const Title: React.FC<TitleProps> = ({title, shortText, full, eighth, isHeading}) => {
    const size = full ? 12 : (eighth ? 8 : 6)
    const Tag = isHeading ? 'h1' : 'h2';  // Condition to choose tag
    return (
        <header>
            <Row>
                <Col xs={12} md={12} lg={size}>
                    <Tag>{title}</Tag>
                    <hr/>
                    {shortText ? <h3>{shortText}</h3> : ''}
                </Col>
            </Row>
        </header>
    )
}