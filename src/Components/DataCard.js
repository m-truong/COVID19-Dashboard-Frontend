import React from 'react'
// Typography imports Material-UI's default font 
// Card content imports "floating-white card design"
import { Card, CardContent, Typography } from "@material-ui/core"
import "../Styles/DataCard.css"

// passing down React component props
function DataCard({ title, cases, total }) {
    return (
        <Card className="dataCard--styles">
            <CardContent className="dataCard">
                {/* Title: Coronavirus cases */}
                <Typography className="dataCard__title" color="textSecondary">
                    {title}
                </Typography>
                {/* 120k Number of Cases */}
                <h2 className="dataCard__cases">{cases}</h2>
                {/* 1.2M Total */}
                <Typography className="dataCard__total" color="textSecondary">
                    {total} Total
                </Typography>
            </CardContent>
        </Card>
    )
}

export default DataCard