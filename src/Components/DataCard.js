import styled, { css, keyframes } from "styled-components"
import { numeralFormatStat } from "../util"

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

export default function DataCard({ title, stat }) {
    return (
        <CardContainer>
            <Heading>Total {title}</Heading>
            <Stat>{numeralFormatStat(stat)}</Stat>
        </CardContainer>
    )
}


