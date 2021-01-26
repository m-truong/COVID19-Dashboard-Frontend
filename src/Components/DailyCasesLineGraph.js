import React, { useEffect, useState } from 'react'
import { Line } from "react-chartjs-2"
import axios from 'axios'
// formats numbers
import numeral from "numeral"

const options = {
    // aspect ratio
    maintainAspectRatio: false,
    // fixes growing height chart 
    responsive: false,
    // doesn't display legend above
    legend: {
        display: false,
    },
    // hover: {
    //     animationDuration: 0
    // },
    elements: {
        // point radius
        point: {
            radius: 0,
        },
    },
    tooltips: {
        mode: "index",
        intersect: false,
        // formats hover tooltip
        callbacks: {
            label: function (tooltipItem, data) {
                return numeral(tooltipItem.value).format("+0,0");
            }
        }
    },
    scales: {
        xAxes: [
            {
                type: "time",
                time: {
                    format: "MM/DD/YY",
                    tooltipFormat: "ll"
                },
                ticks: {
                    color: '#cfcfcf'
                }
            },
        ],
        yAxes: [
            {
                // doesn't display y-axis grid lines
                gridLines: {
                    display: false,
                },
                ticks: {
                    fontSize: 13,
                    fontFamily: "Open Sans",
                    fontWeight: 600,
                    // displays ticks with this timestamp
                    // formats yAxis
                    callback: function (value, index, values) {
                        return numeral(value).format("0a");
                    }
                },
            },
        ],
    }
}

function DailyCasesLineGraph({ casesType = "cases" }) {
    const [historicalCases, setHistoricalCases] = useState([])

    // default value is for "cases" // usable for recovered/deaths 
    const prepareChartData = (data, casesType) => {
        const chartData = []
        let lastDataPoint;
        for (let date in data.cases) {
            // Loops until the end
            if (lastDataPoint) {
                const newDataPoint = {
                    // Find difference in daily cases from current-date and last-date 
                    // Outputs number ## of new daily-cases
                    x: date,
                    y: data[casesType][date] - lastDataPoint
                }
                chartData.push(newDataPoint)
            }
            lastDataPoint = data[casesType][date];
        }
        return chartData;
    }

    const fetchData = async () => {
        const response = await axios.get("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
        console.log(response.data)
        const chartData = prepareChartData(response.data, casesType)
        console.log(chartData)
        setHistoricalCases(chartData)
    }

    useEffect(() => {
        fetchData()
        // casesType is a dependency that will change
    }, [casesType])


    return (
        <>
            {/* Checks if optional-chaining historicalCases is undefined */}
            { historicalCases?.length > 0 && (
                // React LineGraph Component
                <Line
                    data={
                        {
                            datasets: [
                                {
                                    label: "Daily Cases",
                                    backgroundColor: "rgba(204, 16, 52, 0.5)",
                                    borderColor: "#CC1034",
                                    data: historicalCases,
                                }
                            ]
                        }
                    }
                    options={options} />

            )}
        </>
    )
}

export default DailyCasesLineGraph
