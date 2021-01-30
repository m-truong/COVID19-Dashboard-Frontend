import styled, { css, keyframes } from "styled-components"
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import numeral from "numeral"
import "../App.css"

const Heading = styled.span`
    color: white;
    font-size: 0.9rem;
    font-weight: bold;
    text-align: left;
`;

const Stat = styled.h1`
    font-size: 0.9rem;
    font-weight: bold;
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    &:hover {
        // text-shadow: 2px 2px white;
    }
    ${(props) => {
        switch (props.type) {
            case "Cases":
                return "color: red;";
            case "Deaths":
                return "color: red;";
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
        box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    }
`;


export default function StatsTable({ name, region, type }) {
    return (
        <TableContainer className="table--styles">
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <Heading>{name}</Heading>
                    </TableCell>
                        <TableCell align="right">
                            <Heading>{type}</Heading>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        region.map(({ name, stat }, idx) => {
                            return (
                                <TableRow key={idx}>
                                    <TableCell><Heading>{name}</Heading></TableCell>
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

