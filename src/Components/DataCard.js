import React from 'react'
// Typography imports Material-UI's default font 
// Card content imports "floating-white card design"
import { Card, CardContent, Typography } from "@material-ui/core"
import "../Styles/DataCard.css"
import numeral from "numeral"


// passing down React component props
function DataCard({ title, cases, isRed, active, total, ...props }) {
    return (
        <Card
            onClick={props.onClick}
            className={`dataCard--styles 
            ${active && `dataCard--styles--selected`} 
            ${isRed && `dataCard--styles--red`}
            `}>
            <CardContent className="dataCard">
                {/* Title: Coronavirus cases */}
                <Typography className="dataCard__title" color="textSecondary">
                    {title}
                </Typography>
                {/* 120k Number of Cases */}
                <h2 className={`dataCard__cases
                ${!isRed && `dataCard--styles--green`}
                `}>
                    {cases}
                </h2>
                {/* 1.2M Total */}
                <Typography className="dataCard__total" color="textSecondary">
                    {total} Total
                </Typography>
            </CardContent>
        </Card>
    )
}

export default DataCard