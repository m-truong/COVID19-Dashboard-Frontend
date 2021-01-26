import "../Styles/WorldMap.css"
import { Box } from "@material-ui/core"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"

function WorldMap() {
    return (
        <Box className="map">
            <MapContainer
                // Needs height styling in order for MapContainer to appear
                className="map-container--styles"
                center={[51.0, 19.0]}
                zoom={4}
                maxZoom={18}
                scrollWheelZoom={false}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={[51.505, -0.09]}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            </MapContainer>
        </Box>
    )
}

export default WorldMap