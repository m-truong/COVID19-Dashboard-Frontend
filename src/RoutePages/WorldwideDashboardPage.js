import { useState, useEffect, useContext } from "react"
import { Container, Row, Col } from "react-bootstrap"
import { sortCountriesTable } from "../util"
import LeafletMap from "../Components/LeafletMap"
import DailyCasesGraph from "../Components/DailyCasesGraph"
import StatsTable from "../Components/StatsTable"
import DataCard from "../Components/DataCard"
import axios from "axios"

export default function WorldwideDashboardPage(props) {
    const [worldData, setWorldData] = useState([])
    const [countriesData, setCountriesData] = useState([])
    const [casesTableData, setCasesTableData] = useState([])
    const [deathsTableData, setDeathsTableData] = useState([])
    const [recoveredTableData, setRecoveredTableData] = useState([])

    // const [countriesAbbrevs, setCountriesAbbrevs] = useState([])

    const getWorldData = async () => {
        try {
            const worldDataResponse = await axios.get("https://disease.sh/v3/covid-19/all")
            console.log(worldDataResponse.data)
            setWorldData(worldDataResponse.data)
        } catch (e) {
            console.error(e)
        }
    }
    const getCountriesData = async () => {
        try {
            const countriesDataResponse = await axios.get("https://disease.sh/v3/covid-19/countries")
            console.log(countriesDataResponse.data)
            const sortedCases = sortCountriesTable(countriesDataResponse.data.map((countryObj) => (
                {
                    country: countryObj.country,
                    abbrev: countryObj.countryInfo.iso2,
                    stat: countryObj.cases,
                }
            )))
            const sortedDeaths = sortCountriesTable(countriesDataResponse.data.map((countryObj) => (
                {
                    country: countryObj.country,
                    abbrev: countryObj.countryInfo.iso2,
                    stat: countryObj.deaths,
                }
            )))
            const sortedRecovered = sortCountriesTable(countriesDataResponse.data.map((countryObj) => (
                {
                    country: countryObj.country,
                    abbrev: countryObj.countryInfo.iso2,
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
                    <StatsTable countries={casesTableData} type="Cases">

                    </StatsTable>
                </Col>
                <Col md={2}>
                    <DataCard title={"Deaths"} stat={worldData.deaths}>

                    </DataCard>
                    <StatsTable countries={deathsTableData}  type="Deaths">


                    </StatsTable>
                </Col>
                <Col md={2}>
                    <DataCard title={"Recovered"} stat={worldData.recovered}>

                    </DataCard>
                    <StatsTable countries={recoveredTableData} type="Recovered">


                    </StatsTable>
                </Col>
            </Row>
        </Container>
    )
}

