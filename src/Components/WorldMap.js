import Box from "@material-ui/core"
import { Map as GlobalMap, TileLayer } from "react-leaflet"

function WorldMap() {
    return (
        <Box className="map">
            <GlobalMap>
                <TileLayer></TileLayer>
            </GlobalMap>
        </Box>
    )
}

export default WorldMap