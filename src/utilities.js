import { Circle, Popup } from "react-leaflet"
import styled, { css, keyframes } from "styled-components"
import numeral from "numeral"

export const statesArray = [
    { state: "Wisconsin", stateInfo: { lat: 44.500000, long: -89.500000 } },
    { state: "West Virginia", stateInfo: { lat: 39.000000, long: -80.500000 } },
    { state: "Vermont", stateInfo: { lat: 44.000000, long: -72.699997 } },
    { state: "Texas", stateInfo: { lat: 31.000000, long: -100.000000 } },
    { state: "South Dakota", stateInfo: { lat: 44.500000, long: -100.000000 } },
    { state: "Rhode Island", stateInfo: { lat: 41.700001, long: -71.500000 } },
    { state: "Oregon", stateInfo: { lat: 44.000000, long: -120.500000 } },
    { state: "New York", stateInfo: { lat: 43.000000, long: -75.000000 } },
    { state: "New Hampshire", stateInfo: { lat: 44.000000, long: -71.500000 } },
    { state: "Nebraska", stateInfo: { lat: 41.500000, long: -100.000000 } },
    { state: "Kansas", stateInfo: { lat: 38.500000, long: -98.000000 } },
    { state: "Mississippi", stateInfo: { lat: 33.000000, long: -90.000000 } },
    { state: "Illinois", stateInfo: { lat: 40.000000, long: -89.000000 } },
    { state: "Delaware", stateInfo: { lat: 39.000000, long: -75.500000 } },
    { state: "Connecticut", stateInfo: { lat: 41.599998, long: -72.699997 } },
    { state: "Arkansas", stateInfo: { lat: 34.799999, long: -92.199997 } },
    { state: "Indiana", stateInfo: { lat: 40.273502, long: -86.126976 } },
    { state: "Missouri", stateInfo: { lat: 38.573936, long: -92.603760 } },
    { state: "Florida", stateInfo: { lat: 27.994402, long: -81.760254 } },
    { state: "Nevada", stateInfo: { lat: 39.876019, long: -117.224121 } },
    { state: "Maine", stateInfo: { lat: 45.367584, long: -68.972168 } },
    { state: "Michigan", stateInfo: { lat: 44.182205, long: -84.506836 } },
    { state: "Georgia", stateInfo: { lat: 33.247875, long: -83.441162 } },
    { state: "Hawaii", stateInfo: { lat: 19.741755, long: -155.844437 } },
    { state: "Alaska", stateInfo: { lat: 66.160507, long: -153.369141 } },
    { state: "Tennessee", stateInfo: { lat: 35.860119, long: -86.660156 } },
    { state: "Virginia", stateInfo: { lat: 37.926868, long: -78.024902 } },
    { state: "New Jersey", stateInfo: { lat: 39.833851, long: -74.871826 } },
    { state: "Kentucky", stateInfo: { lat: 37.839333, long: -84.270020 } },
    { state: "North Dakota", stateInfo: { lat: 47.650589, long: -100.437012 } },
    { state: "Minnesota", stateInfo: { lat: 46.392410, long: -94.636230 } },
    { state: "Oklahoma", stateInfo: { lat: 36.084621, long: -96.921387 } },
    { state: "Montana", stateInfo: { lat: 46.965260, long: -109.533691 } },
    { state: "Washington", stateInfo: { lat: 47.751076, long: -120.740135 } },
    { state: "Utah", stateInfo: { lat: 39.419220, long: -111.950684 } },
    { state: "Colorado", stateInfo: { lat: 39.113014, long: -105.358887 } },
    { state: "Ohio", stateInfo: { lat: 40.367474, long: -82.996216 } },
    { state: "Alabama", stateInfo: { lat: 32.318230, long: -86.902298 } },
    { state: "Iowa", stateInfo: { lat: 42.032974, long: -93.581543 } },
    { state: "New Mexico", stateInfo: { lat: 34.307144, long: -106.018066 } },
    { state: "South Carolina", stateInfo: { lat: 33.836082, long: -81.163727 } },
    { state: "Pennsylvania", stateInfo: { lat: 41.203323, long: -77.194527 } },
    { state: "Arizona", stateInfo: { lat: 34.048927, long: -111.093735 } },
    { state: "Maryland", stateInfo: { lat: 39.045753, long: -76.641273 } },
    { state: "Massachusetts", stateInfo: { lat: 42.407211, long: -71.382439 } },
    { state: "California", stateInfo: { lat: 36.778259, long: -119.417931 } },
    { state: "Idaho", stateInfo: { lat: 44.068203, long: -114.742043 } },
    { state: "Wyoming", stateInfo: { lat: 43.075970, long: -107.290283 } },
    { state: "North Carolina", stateInfo: { lat: 35.782169, long: -80.793457 } },
    { state: "Louisiana", stateInfo: { lat: 30.391830, long: -92.329102 } },
]

const circleColors = {
    option: { color: "#b80f0a", fillColor: "#b80f0a" },
}
const PopupBox = styled.div`
    color: white;
    background-color: #2E2F2F;
    padding: 10px;
`;

const PopupStat = styled.h2`
    font-size: 1rem;
    margin-top: 5px;
`;

export const drawCovidCircles = (covidCircleData, type) => {
    return (
        covidCircleData.map((regionObj, idx) => (
            <Circle
                key={idx}
                pathOptions={circleColors.option}
                radius={type === "Worldwide" ? Math.sqrt(regionObj.cases) * 400 : Math.sqrt(regionObj.cases) * 250}
                fillOpacity={0.4}
                center={[regionObj.countryInfo.lat, regionObj.countryInfo.long]}
            >
                <Popup>
                    <PopupBox>
                        <PopupStat>
                            {regionObj.country}
                        </PopupStat>
                        <PopupStat>
                            Cases: {numeral(regionObj.cases).format("0,0")}
                        </PopupStat>
                        <PopupStat>
                            Recovered: {numeral(regionObj.recovered).format("0,0")}
                        </PopupStat>
                        <PopupStat>
                            Deaths: {numeral(regionObj.deaths).format("0,0")}
                        </PopupStat>
                    </PopupBox>
                </Popup>
            </Circle >
        )))
};

export const sortTableData = (data) => {
    const sortedCountries = [...data]
    return sortedCountries.sort((currCountry, nextCountry) =>
        (currCountry.stat > nextCountry.stat) ? -1 : 1
    );
}


