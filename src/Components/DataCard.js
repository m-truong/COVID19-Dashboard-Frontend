import styled, { css, keyframes } from "styled-components"
import numeral from "numeral"

const Heading = styled.h2`
    color: white;
    text-align: center;
    font-family: 'Fira Sans', sans-serif;
`;

const Stat = styled.h1`
    color: crimson;
    text-align: center;
    font-family: 'Fira Sans', sans-serif;
    ${(props) => {
        switch (props.type) {
            case "Cases":
                return "color: red;";
            case "Deaths":
                return "color: red;";
            case "Recovered":
                return "color: green;";
            case "Vaccines Administered":
                return "color: green;";
        }
        return "color: black;";
    }}
`;

const CardContainer = styled.div`
    background-color: #2E2F2F;
    border-radius: 0.5rem !important;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);

    &:hover {
        box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    }
`;

export default function DataCard({ title, stat}) {
    return (
        <CardContainer>
            <Heading>Total {title}</Heading>
            <Stat type={title}>{numeral(stat).format("0,0")}</Stat>
        </CardContainer>
    )
}


