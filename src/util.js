// Import 'Numeral' to format numbers
import numeral from "numeral"
// Import 'Circle' to draw Leaflet circles on WorldMap
// Import Popup for interactive Leaflet Popup display
import { Circle, Popup } from "react-leaflet"
import { Box } from "@material-ui/core"
import "./Styles/WorldMap.css"

/** 
 * This sortCountriesTable() uses '.sort' to sort the countries.
 * 1. If currCountry # cases is greater, returns -1, sorts to an
 * index lower than nextCountry, and currCountry comes first 
 * 2. If currCountry # cases is NOT greater, returns 1, sorts 
 * nextCountry to index lower than currCountry, and nextCountry 
 * comes first 
 */

export const sortCountriesTable = (data) => {
    const sortedCountries = [...data]
    return sortedCountries.sort((currCountry, nextCountry) =>
        (currCountry.cases > nextCountry.cases) ? -1 : 1
    );
}


const casesTypeColors = {
    cases: {
        // size of 'Circle' components 
        multiplier: 500,
        // need to pass-in options to change input and fill color as pathOptions
        option: { color:"#cc1034", fillColor: "#cc1034" },
    },
    recovered: {
        multiplier: 800,
        option: { color:"#7dd71d", fillColor: "#7dd71d" },
    },
    deaths: {
        multiplier: 1000,
        option: { color:"#800080", fillColor: "#800080" }
    },
};

export const numeralFormatStat = (stat) =>
    // formats numerals based with "k" and "m" abbreviations for thousands and millions
    stat ? `+${numeral(stat).format("0.0a")}` : "+0";

/**
 * Draws COVID circles on WorldMap using interactive tooltips 
 */
// clicking on different cards renders different colored circles 
export const showCovidCirclesOnMap = (data, casesType = "cases") =>
    // no {} uses implicit return
    data.map((country) => (
        <Circle
            center={[country.countryInfo.lat, country.countryInfo.long]}
            fillOpacity={0.4}
            // dynamically changes square-bracket value to change casesTypeColors based on passed-in String for cases 
            pathOptions={casesTypeColors[casesType].option}
            // calculates radius of circle based on number of COVID cases multiplied by multiplier property 
            radius={
                Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
            }
        >
            <Popup>
                <Box className="map__popup">
                    <Box
                        className="map__flag"
                        style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
                    />
                    <Box className="map__country">{country.country}</Box>
                    <Box className="map__confirmed">Cases: {numeral(country.cases).format("0,0")}</Box>
                    <Box className="map__recovered">Recovered: {numeral(country.recovered).format("0,0")}</Box>
                    <Box className="map__deaths">Deaths: {numeral(country.deaths).format("0,0")}</Box>
                </Box>
            </Popup>
        </Circle>

    ));
