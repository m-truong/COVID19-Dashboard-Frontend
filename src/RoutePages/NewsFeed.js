import { useState, useEffect } from "react"
import { Container, Row, Col } from "react-bootstrap"
import DataCard from "../Components/DataCard"
import axios from "axios"
import { Box, prepareChartData } from "../utilities"
import poster from "../Public/covid19_risk.png"
import DailyCasesGraph from "../Components/DailyCasesGraph"


export default function NewsFeed() {
    const [worldHistoricalCases, setWorldHistoricalCases] = useState([])
    const [unitedStatesHistoricalCases, setUSHistoricalCases] = useState([])
    const [totalVaccines, setTotalVaccines] = useState([])
    const [tweetsData, setTweetsData] = useState([])

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
        console.log(sumVaccines)
        setTotalVaccines(sumVaccines)
    }
    
    const [token, setToken] = useState("AAAAAAAAAAAAAAAAAAAAAPw1MQEAAAAA%2BnKaVgyRfG4TfnfvC6Ss8boCUow%3Dj9CVdyRgXy52MbBgLW47gdxRtlF875buXqTHIiGBsq7FFMVRrb") 

    const getTweetsData = async (token) => {
        try {
            const responseTweetData = await fetch("https://api.twitter.com/1.1/search/tweets.json?q=covid&result_type=popular&count=5&lang=en", {
                headers: {
                    "Authorization": `Bearer ${token}`,
                }
            })
            const responseJSON = await responseTweetData.json();
            console.log(responseJSON)
        } catch (e) {
            console.error(e)
        }
        // correct auth for twitter version
    }

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

    useEffect(() => {
        getWorldHistoricalData()
        getUnitedStatesHistoricalData()
        getVaccinesData()
        getTweetsData(token)
    }, [])

    return (
        <Container fluid>
            <Row>
                <Col md={4}>
                    <DailyCasesGraph title="Worldwide Daily New Cases" graphData={worldHistoricalCases} />
                    <DailyCasesGraph title="US Daily New Cases" graphData={unitedStatesHistoricalCases} />
                </Col>
                <Col md={4}>
                    <h1>Twitter Feed</h1>

                </Col>
                <Col md={4}>
                    <DataCard title="Vaccines Administered" stat={totalVaccines} style={{ width: "100px" }}></DataCard>
                    <Box className="hover" style={{ backgroundColor: "#d3d3d3;", minHeight: "200px;", height: "200px;" }}>

                        <img width="100%" height="100%" src={poster} alt="covid19_risk_img" />
                    </Box>
                </Col>
            </Row>
        </Container>
    )
}

