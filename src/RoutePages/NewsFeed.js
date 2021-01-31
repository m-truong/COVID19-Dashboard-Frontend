import { useState, useEffect, useContext } from "react"
import { Container, Row, Col } from "react-bootstrap"
import DataCard from "../Components/DataCard"
import axios from "axios"
import { Box, prepareChartData } from "../utilities"
import poster from "../Public/covid19_risk.png"
import DailyCasesGraph from "../Components/DailyCasesGraph"
// import Lightbox from 'react-image-lightbox'
// import 'react-image-lightbox/style.css'

export default function NewsFeed() {
    // const [isOpen, setIsOpen] = useState(false)
    const [worldHistoricalCases, setWorldHistoricalCases] = useState([])
    const [unitedStatesHistoricalCases, setUSHistoricalCases] = useState([])
    const [vaccinesData, setVaccinesData] = useState([])
    const [totalVaccines, setTotalVaccines] = useState([])

    const getWorldHistoricalData = async () => {
        const response = await axios.get("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
        const chartData = prepareChartData(response.data)
        console.log(chartData)
        setWorldHistoricalCases(chartData)
    }

    const getUnitedStatesHistoricalData = async () => {
        const response = await axios.get("https://disease.sh/v3/covid-19/historical/usa?lastdays=120")
        const chartData = prepareChartData(response.data.timeline)
        console.log(chartData)
        setUSHistoricalCases(chartData)
    }

    const getVaccinesAdministeredTotal = () => {
        const tempVaccineArray = Object.values(vaccinesData)
        const sum = tempVaccineArray.reduce((accum, curr) => {
            return accum + curr;
        }, 0)
        setTotalVaccines(sum)
    }

    const getVaccinesData = async () => {
        try {
            const vaccineDataResponse = await axios.get("https://disease.sh/v3/covid-19/vaccine/coverage?lastdays=all")
            console.log(vaccineDataResponse.data)
            setVaccinesData(vaccineDataResponse.data)
            console.log(vaccinesData)
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        getVaccinesData()
        getVaccinesAdministeredTotal()
        getWorldHistoricalData()
        getUnitedStatesHistoricalData()
    }, [])

    return (
        <Container fluid>
            <Row>
                <Col md={5}>
                    <h1>Twitter Feed</h1>
                </Col>
                <Col md={4}>
                    {/* <h1>ChartJs</h1> */}
                    <DailyCasesGraph title="Worldwide Daily New Cases" graphData={worldHistoricalCases} />
                    <DailyCasesGraph title="United States Daily New Cases" graphData={unitedStatesHistoricalCases} />
                </Col>
                <Col md={3}>
                    <DataCard title="Vaccines Administered" stat={totalVaccines}></DataCard>
                    <Box className="hover" style={{ backgroundColor: "#d3d3d3;", minHeight: "200px;", height: "200px;" }}>
                        {/* <Lightbox
                            mainSrc={poster}
                            onClick={setIsOpen(true)}
                        /> */}
                        <img width="100%" height="100%" src={poster} alt="covid19_risk_img" />
                    </Box>
                </Col>
            </Row>
        </Container>
    )
}

