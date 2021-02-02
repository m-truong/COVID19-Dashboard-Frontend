import { useState, useEffect, useContext } from "react"
import { Container, Row, Col } from "react-bootstrap"
import { sortTableData, statesArray, Title } from "../utilities"
import CovidLiveMap from "../Components/CovidLiveMap"
import StatsTable from "../Components/StatsTable"
import DataCard from "../Components/DataCard"
import axios from "axios"

export default function StatesDashboard(props) {
    const [usData, setUSData] = useState([])
    const [casesTableData, setCasesTableData] = useState([])
    const [deathsTableData, setDeathsTableData] = useState([])
    const [recoveredTableData, setRecoveredTableData] = useState([])

    // React requires useState
    const [statesLatLongData, setStatesLatLongData] = useState([])

    const getUnitedStatesData = async () => {
        try {
            const unitedStatesDataResponse = await axios.get("https://disease.sh/v3/covid-19/countries/us?strict=true")
            setUSData(unitedStatesDataResponse.data)
        } catch (e) {
            console.error(e)
        }
    }

    const getStatesData = async () => {
        try {
            const statesDataResponse = await axios.get("https://disease.sh/v3/covid-19/states")
            const tempStatesArray = statesDataResponse.data.map(x => {
                let found = statesArray.find(item => item.state === x.state);
                if (found) {
                    return (
                        {
                            country: found.state,
                            countryInfo: {
                                lat: found.stateInfo.lat,
                                long: found.stateInfo.long
                            },
                            cases: x.cases,
                            deaths: x.deaths,
                            recovered: x.recovered,
                        }
                    );
                }
            }).filter(item => item !== undefined);

            setStatesLatLongData(tempStatesArray)

            const sortedCases = sortTableData(statesDataResponse.data.map((stateObj) => (
                {
                    name: stateObj.state,
                    stat: stateObj.cases,
                }
            )))
            const sortedDeaths = sortTableData(statesDataResponse.data.map((stateObj) => (
                {
                    name: stateObj.state,
                    stat: stateObj.deaths,
                }
            )))
            const sortedRecovered = sortTableData(statesDataResponse.data.map((stateObj) => (
                {
                    name: stateObj.state,
                    stat: stateObj.recovered,
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
        getUnitedStatesData()
        getStatesData()
    }, [])

    return (
        <Container fluid className="margin-top">
            <Title>COVID-19 United States Dashboard </Title>
            <Row className="justify-content-around">
                <Col className="col-margin-top" md={2}>
                    <DataCard title={"Cases"} stat={usData.cases} />
                    <StatsTable name="States" region={casesTableData} type="Cases" className="hover"/>
                </Col>
                <Col md={6}>
                    <CovidLiveMap covidCircleData={statesLatLongData} type="United States"/>
                </Col>
                <Col className="col-margin-top" md={2}>
                    <DataCard title={"Deaths"} stat={usData.deaths} />
                    <StatsTable name="States" region={deathsTableData} type="Deaths" className="hover"/>
                </Col>
                <Col  className="col-margin-top" md={2}>
                    <DataCard title={"Recovered"} stat={usData.recovered} />
                    <StatsTable name="States" region={recoveredTableData} type="Recovered" className="hover"/>
                </Col>
            </Row>
        </Container>
    )
}

