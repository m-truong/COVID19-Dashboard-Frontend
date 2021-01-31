import React, { useEffect, useState } from 'react'
import { Line, prepareChartData } from "react-chartjs-2"
import { options, Subheading, Box } from "../utilities"
import axios from 'axios'
import numeral from "numeral"


export default function DailyCasesGraph({ title, graphData }) {
    // const [] = useState([])

    return (
        // fixes height growth issue
        <Box className="hover" style={{"position" : "relative", "display" : "block"}}>
            <Subheading>{title} Graph </Subheading>
            <Line
                options={options}
                data={
                    {
                        datasets: [
                            {
                                data: graphData,
                                backgroundColor: "rgba(204, 16, 52, 0.5)",
                                borderColor: "#CC1035",
                                label: "Daily New Cases",
                            }
                        ]
                    }
                }
            />
        </Box>
    )
}

