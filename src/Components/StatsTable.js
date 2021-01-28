import styled, { css, keyframes } from "styled-components"
// import '../Styles/CountriesTable.css'
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
// import numeral from "numeral"


export default function StatsTable({ countries }) {
    // console.log(countries) // raw data ARRAY-JSON object
    return (
        <TableContainer className="table--styles">
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Countries
                    </TableCell>
                        <TableCell align="right">
                            # Cases
                    </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        // maps over every single object
                        countries.map(({ country, cases}, idx) => {
                            // { console.log(country, cases) }
                            // need explicit return
                            return (
                                // wrap containing element
                                <TableRow key={idx}>
                                    <TableCell>{country}</TableCell>
                                    <TableCell align="right"><strong>{numeral(cases).format("0,0")}</strong></TableCell>
                                </TableRow>
                            )
                        })
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )
}

