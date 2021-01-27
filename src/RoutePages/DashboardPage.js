import React from 'react'

import '../App.css';
import axios from 'axios'
import { Box, FormControl, MenuItem, Select, Card, CardContent, Table } from '@material-ui/core'
import { Container, Row, Col } from 'react-bootstrap'
import { useState, useEffect, useContext } from 'react'
import DataCard from '../Components/DataCard'
import WorldMap from '../Components/WorldMap'
import CountriesTable from '../Components/CountriesTable';
import { sortCountriesTable, numeralFormatStat } from '../util';
import DailyCasesLineGraph from '../Components/DailyCasesLineGraph';

function DashboardPage() {
    // keeps track of currently selected country to display appropriate COVID data
    // default 1st option
    const [countriesDropdownAbbrevs, setCountriesAbbrevs] = useState([])
    // changes dropdown menu option
    const [selectCountry, setSelectCountry] = useState("worldwide")
    // changes stat-card information based on selected country
    const [displayCountry, setDisplayCountry] = useState({})
    // changes Table state for countries cases
    const [tableData, setTableData] = useState([])

    // state used to pass down COVID cases to draw circles on WorldMap
    const [mapCovidCircles, setMapCovidCircles] = useState([])

    // MapState Focus changes when selectCountry state changes 
    const [mapCountryFocus, setMapCountryFocus] = useState({ lat: 34.80746, lng: -40.4796 })
    // changes MapZoom
    const [mapZoom, setMapZoom] = useState(2);

    const [casesType, setCasesDisplayType] = useState("cases")

    // total number of covid cases
    const fetchAll = async () => {
        try {
            const response = await axios.get("https://disease.sh/v3/covid-19/all")
            // initially renders total worldwide cases
            setDisplayCountry(response.data)
        } catch (err) {
            console.error(err)
        }
    }
    // async -> sends request, waits 4 it to complete, parses the data
    const fetchCountryList = async () => {
        try {
            const response = await axios.get("https://disease.sh/v3/covid-19/countries")
            // auto parses JSON
            // console.log(response)
            // get response.data Array[221]
            const countriesAbbrevsClean = response.data.map((countryObj) => (
                {
                    name: countryObj.country,
                    abbrev: countryObj.countryInfo.iso2, // USA, FR
                }
            ));
            setMapCovidCircles(response.data)
            // passing in raw response.data
            const orderedCountries = sortCountriesTable(response.data)
            setTableData(orderedCountries)
            // changes state
            setCountriesAbbrevs(countriesAbbrevsClean)
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        // Invokes async fetch Default setCountry is "worldwide covid" on initial render
        fetchAll()
        fetchCountryList()
        // Runs once when component loads
    }, [])

    // Helper function 
    const onSelectedCountryChange = async (evt) => {
        const countryAbbrev = evt.target.value
        // console.log(countryAbbrev)

        // Conditional-statement to change fetch call
        const covidAPIURL =
            countryAbbrev === "worldwide"
                ? `https://disease.sh/v3/covid-19-all`
                : `https://disease.sh/v3/covid-19/countries/${countryAbbrev}`
        const response = await axios.get(covidAPIURL)
        // console.log(response.data)
        // updates the currently selected country in dropdown menu 
        setSelectCountry(countryAbbrev)
        // sets entire country object data (Not Cleaned Yet Though!)
        setDisplayCountry(response.data)
        // Changes the initial 'lat' and 'long' of mapCountryFocus
        // which is passed down into WorldMap component to change MapContainer 
        // 'center' attribute
        // ** Not Working ** //
        // setMapCountryFocus([response.data.countryInfo.lat, response.data.countryInfo.long])
        // ** Not Working ** //
        // setMapZoom(4)

        // console.log(selectCountry)
    }
    return (
        <Container fluid className="dashboard">
            {/* Title + Country dropdown  */}
            <Row className="justify-content-around">
                <Col sm="auto" md={8} className="dashboard__left">

                    <Box className="dashboard__header">
                        <h1>COVID-19 LIVE-MAP</h1>
                        <FormControl className="dashboard__dropdown">
                            <Select value={selectCountry} onChange={onSelectedCountryChange} variant="outlined">
                                {/* First option is "worldwide" covid data */}
                                <MenuItem value="worldwide">Worldwide</MenuItem>
                                {/* Loop through all the countries and show a drop down list of all the options */}
                                {
                                    countriesDropdownAbbrevs.map((country, idx) => (
                                        <MenuItem key={idx} value={country.abbrev}>
                                            {country.name}
                                        </MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </Box>

                    <Box className="dashboard__stats">
                        {/* CasesCard title="Coronavirus cases"*/}
                        {/* pass down as props using React-element props */}
                        <DataCard
                            isRed
                            // resolves into boolean
                            active={casesType === "cases"}
                            onClick={(evt) => setCasesDisplayType("cases")}
                            title="Coronavirus Cases"
                            cases={numeralFormatStat(displayCountry.todayCases)}
                            total={numeralFormatStat(displayCountry.cases)}
                        />
                        {/* RecoveredCard title="Coronavirus recoveries"*/}
                        <DataCard
                            active={casesType === "recovered"}
                            onClick={(evt) => setCasesDisplayType("recovered")}
                            title="Recovered"
                            cases={numeralFormatStat(displayCountry.todayRecovered)}
                            total={numeralFormatStat(displayCountry.recovered)}
                        />
                        {/* DeathsCard */}
                        <DataCard
                            isRed
                            active={casesType === "deaths"}
                            onClick={(evt) => setCasesDisplayType("deaths")}
                            title="Deaths"
                            cases={numeralFormatStat(displayCountry.todayDeaths)}
                            total={numeralFormatStat(displayCountry.deaths)}
                        />
                    </Box>

                    {/* COVID-19 World Map */}
                    <WorldMap
                        casesType={casesType}
                        mapCovidCircles={mapCovidCircles}
                        mapZoom={mapZoom} mapCountryFocus={mapCountryFocus}
                    />
                </Col>

                <Col sm="auto" md={4} className="dashboard__right">
                    <Card>
                        <CardContent>
                            <h3>Live Cases By Country</h3>
                            {/* Countries Most Cases Chart  */}
                            <CountriesTable countries={tableData} />
                            <h3 className="dashboard__graphTitle">Worldwide New {casesType}</h3>
                            {/* Rising Daily Cases Line-Graph Chart.js */}
                            <DailyCasesLineGraph casesType={casesType}></DailyCasesLineGraph>
                        </CardContent>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default DashboardPage
