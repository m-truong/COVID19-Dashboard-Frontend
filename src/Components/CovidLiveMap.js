import styled, { css, keyframes } from "styled-components"
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import { drawCovidCircles } from "../utilities"

const MapBorder = styled.div`
    height: 500px;
    background-color: ghostwhite;
    padding: 1rem;
    border-radius: 20px;
    margin-top: 3rem;
    box-shadow: 0 0 8px -4px rgba(0, 0, 0, 0.5);
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);

    &:hover {
        /* cursor: pointer; */
        box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    }
`;

export default function CovidLiveMap({ covidCircleData, type }) {
    return (
        <MapBorder>
            <MapContainer
                className="map--styles"
                center={type === "Worldwide" ? { lat: 34.80746, lng: -5.4796 } : { lat: 37.0902, lng: -95.7129 }}
                zoom={type === "Worldwide" ? 2 : 4}
                maxZoom={9}
                scrollWheelZoom={false}
            >
                <TileLayer
                    url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {drawCovidCircles(covidCircleData, type)}
            </MapContainer>
        </MapBorder>
    )
}