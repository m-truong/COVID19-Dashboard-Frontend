import styled, { css, keyframes } from "styled-components"
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import numeral from "numeral"
import "../App.css"

const Heading = styled.h2`
    color: grey;
    text-align: center;
`;

const Stat = styled.h1`
    font-size: 0.9rem;
    font-weight: bold;
    ${(props) => {
        switch (props.type) {
            case "Cases":
                return "color: crimson;";
            case "Deaths":
                return "color: purple;";
            case "Recovered":
                return "color: green;";
        }
        return "color: black;";
    }}
`;

const TableStyle = styled.div`
    height: 400px;
    overflow: scroll;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);

    // pseudo-class
    &:hover {
        /* cursor: pointer; */
        box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    }
`;


export default function StatsTable({ countries, type }) {
    return (
        <TableContainer className="table--styles">
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Countries
                    </TableCell>
                        <TableCell align="right">
                            {type}
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        countries.map(({ country, stat }, idx) => {
                            return (
                                <TableRow key={idx}>
                                    <TableCell>{country}</TableCell>
                                    <TableCell align="right">
                                            <Stat type={type}>{numeral(stat).format("0,0")}</Stat>
                                    </TableCell>
                                </TableRow>
                            )
                        })
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )
}

