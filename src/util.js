import numeral from "numeral"

export const numeralFormatStat = (stat) =>
    // formats numerals based with "k" and "m" abbreviations for thousands and millions
    stat ? `${numeral(stat).format("0,0")}` : "0";