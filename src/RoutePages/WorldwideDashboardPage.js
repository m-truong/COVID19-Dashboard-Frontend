import { useState, useEffect, useContext } from "react"
import { Container, Row, Col } from "react-bootstrap"
import { Box, sortTableData, Title } from "../utilities"
import CovidLiveMap from "../Components/CovidLiveMap"
import StatsTable from "../Components/StatsTable"
import DataCard from "../Components/DataCard"
import axios from "axios"

export default function WorldwideDashboardPage(props) {
    const [worldData, setWorldData] = useState([])
    const [countriesData, setCountriesData] = useState([])
    const [casesTableData, setCasesTableData] = useState([])
    const [deathsTableData, setDeathsTableData] = useState([])
    const [recoveredTableData, setRecoveredTableData] = useState([])

    const getWorldData = async () => {
        try {
            const worldDataResponse = await axios.get("https://disease.sh/v3/covid-19/all")
            setWorldData(worldDataResponse.data)
        } catch (e) {
            console.error(e)
        }
    }
    const getCountriesData = async () => {
        try {
            const countriesDataResponse = await axios.get("https://disease.sh/v3/covid-19/countries")
            setCountriesData(countriesDataResponse.data)
            const sortedCases = sortTableData(countriesDataResponse.data.map((countryObj) => (
                {
                    name: countryObj.country,
                    stat: countryObj.cases,
                }
            )))
            const sortedDeaths = sortTableData(countriesDataResponse.data.map((countryObj) => (
                {
                    name: countryObj.country,
                    stat: countryObj.deaths,
                }
            )))
            const sortedRecovered = sortTableData(countriesDataResponse.data.map((countryObj) => (
                {
                    name: countryObj.country,
                    stat: countryObj.recovered,
                }
            )))
            setCasesTableData(sortedCases)
            setDeathsTableData(sortedDeaths)
            setRecoveredTableData(sortedRecovered)
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        getWorldData()
        getCountriesData()
    }, [])

    return (
        <Container fluid>
            <Title>COVID-19 Worldwide Dashboard </Title>
            <Row className="justify-content-around">
                <Col md={6}>
                    <CovidLiveMap covidCircleData={countriesData} type="Worldwide" />
                </Col>
                <Col className="col-margin-top" md={2}>
                    <DataCard title={"Cases"} stat={worldData.cases} />
                    <StatsTable name="Countries" region={casesTableData} type="Cases" />
                </Col>
                <Col className="col-margin-top" md={2}>
                    <DataCard title={"Deaths"} stat={worldData.deaths} />
                    <StatsTable name="Countries" region={deathsTableData} type="Deaths" />
                </Col>
                <Col className="col-margin-top" md={2}>
                    <DataCard title={"Recovered"} stat={worldData.recovered} />
                    <StatsTable name="Countries" region={recoveredTableData} type="Recovered" />
                </Col>
            </Row>
        </Container>
    )
}

