import './App.css';
import axios from 'axios'
import { Box, FormControl, MenuItem, Select, Card, CardContent, Table } from '@material-ui/core'
import { Container, Row, Col } from 'react-bootstrap'
import { useState, useEffect, useContext } from 'react'
import DataCard from './Components/DataCard'
import WorldMap from './Components/WorldMap'
import CountriesTable from './Components/CountriesTable';
import { sortCountriesTable } from './util';
import DailyCasesLineGraph from './Components/DailyCasesLineGraph';


function App() {
  // keeps track of currently selected country to display appropriate COVID data
  // default 1st option
  const [countries, setCountries] = useState([])
  // changes dropdown menu option
  const [selectCountry, setSelectCountry] = useState("worldwide")
  // changes stat-card information based on selected country
  const [displayCountry, setDisplayCountry] = useState({})
  const [tableData, setTableData] = useState([])

  // MapState Focus changes when selectCountry state changes 
  const [mapCountryFocus, setMapCountryFocus] = useState({ lat: 34.80746, lng: -40.4796 })
  // changes MapZoom
  const [mapZoom, setMapZoom] = useState(2);
  
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
      console.log(response)
      // get response.data Array[221]
      const countriesClean = response.data.map((countryObj) => (
        {
          name: countryObj.country,
          abbrev: countryObj.countryInfo.iso2, // USA, FR
        }
      ));
      const orderedCountries = sortCountriesTable(response.data)
      // passing in raw response.data
      setTableData(orderedCountries)
      // changes state
      setCountries(countriesClean)
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
    console.log(countryAbbrev)

    // Conditional-statement to change fetch call
    const covidAPIURL =
      countryAbbrev === "worldwide"
        ? `https://disease.sh/v3/covid-19-all`
        : `https://disease.sh/v3/covid-19/countries/${countryAbbrev}`
    const response = await axios.get(covidAPIURL)
    console.log(response.data)
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

    console.log(selectCountry)
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
                  countries.map((country, idx) => (
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
              title="Coronavirus Cases"
              cases={displayCountry.todayCases}
              total={displayCountry.cases}
            />
            {/* RecoveredCard title="Coronavirus recoveries"*/}
            <DataCard
              title="Recovered"
              cases={displayCountry.todayRecovered}
              total={displayCountry.recovered}
            />
            {/* DeathsCard */}
            <DataCard
              title="Deaths"
              cases={displayCountry.todayDeaths}
              total={displayCountry.deaths}
            />
          </Box>

          {/* COVID-19 World Map */}
          <WorldMap mapZoom={mapZoom} mapCountryFocus={mapCountryFocus} />
        </Col>

        <Col sm="auto" md={4} className="dashboard__right">
          <Card>
            <CardContent>
              <h3>Live Cases by Country</h3>
              {/* Countries Most Cases Chart  */}
              <CountriesTable countries={tableData} />
              <h3>Worldwide new Cases</h3>
              {/* Rising Daily Cases Line-Graph Chart.js */}
              <DailyCasesLineGraph></DailyCasesLineGraph>
            </CardContent>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default App;