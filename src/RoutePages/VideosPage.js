import React from 'react'
import { Container, Row, Col } from "react-bootstrap"
import { Box, Title } from "../utilities"
import ReactPlayer from "react-player"

function VideosPage() {
    return (
        <Container fluid>
            <Title>Informative Videos</Title>
            <Row>
                <Col>
                    <Box className="reactPlayerBox--styles">
                        <ReactPlayer
                            // The Coronavirus Explained & What You Should Do
                            url="https://www.youtube.com/watch?v=BtN-goy9VOY"
                            width={"100%"}
                            height={"350px"}
                            controls={true}
                            pip={true}
                        />
                    </Box>
                </Col>
                <Col>
                    <Box className="reactPlayerBox--styles">
                        <ReactPlayer
                            // How vaccines work against COVID-19: Science, Simplified
                            url="https://www.youtube.com/watch?v=uWGTciX795o"
                            width={"100%"}
                            height={"350px"}
                            controls={true}
                            pip={true}
                        />
                    </Box>
                </Col>
                <Col>
                    <Box className="reactPlayerBox--styles">
                        <ReactPlayer
                            // Coronavirus outbreak: A timeline of how COVID-19 spread around world
                            url="https://www.youtube.com/watch?v=ST-cn2JQ31M"
                            width={"100%"}
                            height={"350px"}
                            controls={true}
                            pip={true}
                        />
                    </Box>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Box className="reactPlayerBox--styles">
                        <ReactPlayer
                            // Inside the Lab That Invented the COVID-19 Vaccine
                            url="https://www.youtube.com/watch?v=-92HQA0GcI8"
                            width={"100%"}
                            height={"350px"}
                            controls={true}
                            pip={true}
                        />
                    </Box>
                </Col>
                <Col>
                    <Box className="reactPlayerBox--styles">
                        <ReactPlayer
                            // 10 Tips for Staying Safe in the Era of COVID-19
                            url="https://www.youtube.com/watch?v=xVu_I6WCsto&t=2s"
                            width={"100%"}
                            height={"350px"}
                            controls={true}
                            pip={true}
                        />
                    </Box>
                </Col>
                <Col>
                    <Box className="reactPlayerBox--styles">
                        <ReactPlayer
                            // New Covid strain: Is mutated virus cause for concern?
                            url="https://www.youtube.com/watch?v=bXrx6I46dAk"
                            width={"100%"}
                            height={"350px"}
                            controls={true}
                            pip={true}
                        />
                    </Box>
                </Col>
            </Row>
        </Container>
    )
}

export default VideosPage
