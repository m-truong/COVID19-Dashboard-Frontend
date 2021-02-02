import { useState, useEffect } from "react"
import { Container, Row, Col } from "react-bootstrap"
import { Box, prepareChartData, Title } from "../utilities"
import DailyCasesGraph from "../Components/DailyCasesGraph"
import DataCard from "../Components/DataCard"
import poster from "../assets/covid19_risk.png"
import Tweet from 'react-tweet'
import axios from "axios"

export default function NewsFeed() {
    const [worldHistoricalCases, setWorldHistoricalCases] = useState([])
    const [unitedStatesHistoricalCases, setUSHistoricalCases] = useState([])
    const [totalVaccines, setTotalVaccines] = useState([])
    const [tweetsData, setTweetsData] = useState([])

    const getTweetsData = async () => {
        try {
            const tweets = await axios.get("/tweets/getTweets")
            setTweetsData(tweets.data.statuses)
        } catch (error) {
            console.error(error)
        }
    }
    const getVaccinesData = async () => {
        try {
            const vaccineDataResponse = await axios.get("https://disease.sh/v3/covid-19/vaccine/coverage?lastdays=1")
            getVaccinesAdministeredTotal(vaccineDataResponse.data)
        } catch (e) {
            console.error(e)
        }
    }

    const getVaccinesAdministeredTotal = (myVaccineData) => {
        const tempVaccineArray = Object.values(myVaccineData)
        const sumVaccines = tempVaccineArray.reduce((accum, curr) => {
            return accum + curr;
        }, 0)
        setTotalVaccines(sumVaccines)
    }

    const getWorldHistoricalData = async () => {
        const response = await axios.get("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
        const chartData = prepareChartData(response.data)
        setWorldHistoricalCases(chartData)
    }

    const getUnitedStatesHistoricalData = async () => {
        const response = await axios.get("https://disease.sh/v3/covid-19/historical/usa?lastdays=120")
        const chartData = prepareChartData(response.data.timeline)
        setUSHistoricalCases(chartData)
    }

    useEffect(() => {
        getWorldHistoricalData()
        getUnitedStatesHistoricalData()
        getVaccinesData()
        getTweetsData()
    }, [])

    return (
        <Container fluid className="margin-top">
            <Row>
                <Col md={4}>
                    <DailyCasesGraph title="Worldwide Daily New Cases" graphData={worldHistoricalCases} />
                    <DailyCasesGraph title="US Daily New Cases" graphData={unitedStatesHistoricalCases} />
                </Col>
                <Col md={4}>
                    <Title>Twitter Feed</Title>
                    {tweetsData.map((tweet, idx) => {
                        return (
                            <Box key={idx} className="hover">
                                <Tweet data={tweet} style={{ borderRadius: "2rem;", padding: "2rem;" }} />
                            </Box>
                        )
                    })}
                </Col>
                <Col md={4}>
                    <DataCard title="Vaccines Administered" stat={totalVaccines} style={{ maxWidth: "100px;" }}></DataCard>
                    <Box className="hover" style={{ backgroundColor: "#d3d3d3;", minHeight: "200px;", height: "200px;" }}>
                        <img width="100%" height="100%" src={poster} alt="covid19_risk_img" />
                    </Box>
                </Col>
            </Row>
        </Container>
    )
}
