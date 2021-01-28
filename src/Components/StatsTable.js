import styled, { css, keyframes } from "styled-components"
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import numeral from "numeral"

const Heading = styled.h2`
    color: grey;
    text-align: center;
`;

const Stat = styled.h1`
    color: red;
    text-align: center;
`;

const CardContainer = styled.div`
    background-color: darkgrey;
    border-radius: 0.5rem !important;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);

    // pseudo-class
    &:hover {
        /* cursor: pointer; */
        box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    }
`;


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
                    {/* {
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
                    } */}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

