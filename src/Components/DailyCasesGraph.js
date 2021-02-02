import { Line } from "react-chartjs-2"
import { options, Subheading, Box } from "../utilities"


export default function DailyCasesGraph({ title, graphData }) {
    return (
        // fixes height growth issue
        <Box className="hover" style={{"position" : "relative", "display" : "block"}}>
            <Subheading>{title} </Subheading>
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

