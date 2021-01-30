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
    padding: 15px;
    border-radius: 1rem;
`;

const PopupStat = styled.h2`
    margin-top: 5px;
    ${(props) => {
        switch (props.size) {
            case "Heading":
                return "font-size: 1.3rem;";
        }
        return "font-size: 1.1rem;";
    }}
    ${(props) => {
        switch (props.type) {
            case "Cases":
                return "color: red;";
            case "Deaths":
                return "color: red;";
            case "Recovered":
                return "color: green;";
        }
        return "color: white;";
    }}
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
                        <PopupStat size="Heading" >
                            {regionObj.country}
                        </PopupStat>
                        <PopupStat type="Cases">
                            Cases: {numeral(regionObj.cases).format("0,0")}
                        </PopupStat>
                        <PopupStat type="Deaths">
                            Deaths: {numeral(regionObj.deaths).format("0,0")}
                        </PopupStat>
                        <PopupStat type="Recovered">
                            Recovered: {numeral(regionObj.recovered).format("0,0")}
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

export const Title = styled.h1`
    color: white;
    text-align: center;
    font-size: 3rem;
    font-weight: bold;
    -webkit-transition: all 0.3s ease-out;
    transition: all 0.3s ease-out;
`;

export const Box = styled.div`
    border: 0.15rem #2E2F2F solid;
    background-color: #43464B;
    border-radius: 1.1rem;
    margin: 0.5rem;
    padding: 1rem;
    
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24); 
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);

    &hover: {
        box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22); 
    }
`;

export const Footer = styled.footer`
    text-align: center;
    background-color: #43464B;
    padding-top: 1rem;
    position: fixed;
    left: 0px;
    bottom: 0px;
    height: 4rem;
    width: 100%;

    -webkit-transition: all 0.3s ease-out;
    transition: all 0.3s ease-out;
`;

export const Main = styled.main`
    min-height: 100%;
    &after: {
        content: "";
        display: block; 
        height: 100px;
    }
`;

export const FormBox = styled.div`
    width: 50vw;
    margin: 0 auto;
    margin-top: 20rem;
    border-radius: 1.5rem;
    background-color: #43464B;
    color: white;
    padding: 20px;
`;

export const Input = styled.input`
    margin: 0.9rem;
    padding: 0.5rem;
    border: 0px;
    box-shadow: 0 0 0.2em rgba(0, 0, 0, 0.2), 0 0.2em 0.2em rgba(0, 0, 0, 0.2);
`;

export const Button = styled.button`
    color: white;
    cursor: pointer;
    background-color: #CC0000;
    border: 0.1rem #a4a4a4 solid;

    border-radius: 2rem;
    box-shadow: 0 0 0.2em rgba(0, 0, 0, 0.2), 0 0.2em 0.2em rgba(0, 0, 0, 0.2);
    font-family: "Poppins", sans-serif;
    font-size: 1rem;
    font-weight: bold;

    letter-spacing: 1px;
    margin: 0 1rem;
    padding: 0.5rem;

    text-transform: uppercase;
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    --webkit-font-smoothing: antialiased;
    --moz-osx-font-smoothing: grayscale;

`;

export const options = {
    tooltips: {
        mode: "index",
        intersect: false,
        // displayColors: false,
        titleFontSize: 16,
        bodyFontSize: 14,
        xPadding: 10,
        yPadding: 10,
        callbacks: {
            label: (tooltipItem) => {
                return numeral(tooltipItem.value).format("+0,0");
            }
        }
    },
    scales: {
        yAxes: [
            {
                stacked: true
            }
        ]
    },
    // aspect ratio
    maintainAspectRatio: false,
    // fixes growing height chart 
    responsive: false,
    // doesn't display legend above
    legend: {
        display: false,
    },
    elements: {
        // point radius
        point: {
            radius: 0,
        },
    },
}

export const prepareChartData = () => {

}