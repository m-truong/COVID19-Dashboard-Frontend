import './App.css';
import axios from 'axios'
import { FormControl, MenuItem, Select } from '@material-ui/core';
import { useState, useEffect, useContext } from 'react'

function App() {
  const [countries, setCountries] = useState([])

  // async -> sends request, waits 4 it to complete, parses the data
  useEffect(() => {
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
        // changes state
        setCountries(countriesClean)
      } catch (err) {
        console.error(err);
      }
    }
    // Invokes async fetch 
    fetchCountryList()
    // Runs once when component loads
  }, [])

  return (
    <div className="app">

      {/* Title + Country dropdown  */}

      <div className="app__header">
        <h1>COVID-19 LIVE-MAP</h1>
        <FormControl className="app__dropdown">
          <Select variant="outlined" value="select_form">
            {/* Loop through all the countries and show a drop down list of all the options */}
            {
              countries.map((country, idx) => (
                <MenuItem key={idx} value={country.abbrev}>{country.name}</MenuItem>
              ))
            }
          </Select>
        </FormControl>
      </div>

      {/* CasesCard */}
      {/* RecoveredCard */}
      {/* DeathsCard */}

      {/* COVID-19 World Map */}

      {/* Countries Most Cases Chart  */}
      {/* Rising Daily Cases Line-Graph Chart.js */}

    </div>
  );
}

export default App;
