import { useState, useEffect, useContext } from "react"
import { Container, Row, Col } from "react-bootstrap"
import LeafletMap from "../Components/LeafletMap"
import DailyCasesGraph from "../Components/DailyCasesGraph"
import StatsTable from "../Components/StatsTable"
import DataCard from "../Components/DataCard"
import axios from "axios"

export default function WorldwideDashboardPage(props) {
    const [worldData, setWorldData] = useState([])

    const getWorldData = async () => {
        try {
            const covidData = await axios.get("https://disease.sh/v3/covid-19/all")
            console.log(covidData)
            setWorldData(covidData.data)
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(()=> {
        getWorldData();
    }, [])

    return (
        <Container fluid>
            <Row className="justify-content-around">
                <Col md={6}>
                <LeafletMap>

                </LeafletMap>
                <DailyCasesGraph>

                </DailyCasesGraph>
                </Col>
                <Col md={2}>
                    <DataCard title={"Confirmed Cases"} stat={worldData.cases}>

                    </DataCard>
                    <StatsTable>

                    </StatsTable>
                </Col>
                <Col md={2}>
                    <DataCard title={"Deaths"} stat={worldData.deaths}>

                    </DataCard>
                    <StatsTable>
                        
                    </StatsTable>
                </Col>
                <Col md={2}>
                    <DataCard title={"Recovered"} stat={worldData.recovered}>

                    </DataCard>
                    <StatsTable>
                        
                    </StatsTable>
                </Col>
            </Row>
        </Container>
    )
}

