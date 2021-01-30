import { useState, useEffect, useContext } from "react"
import { Container, Row, Col } from "react-bootstrap"
import DataCard from "../Components/DataCard"
import axios from "axios"

function NewsFeed() {
    return (
        <Container fluid>
            <Row>
                <Col md={3}>
                    <h1>Twitter Feed</h1>
                </Col>
                <Col md={6}>
                    <h1>ChartJs</h1>
                </Col>
                <Col md={3}>
                    <h1>Poster</h1>
                    <h1>DataCard on Vaccines</h1>
                </Col>
            </Row>
        </Container>
    )
}

export default NewsFeed
