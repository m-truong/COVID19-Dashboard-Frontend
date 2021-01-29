import numeral from "numeral"

export const numeralFormatStat = (stat) =>
    // formats numerals based with "k" and "m" abbreviations for thousands and millions
    stat ? `${numeral(stat).format("0,0")}` : "0";

export const sortCountriesTable = (data) => {
    const sortedCountries = [...data]
    return sortedCountries.sort((currCountry, nextCountry) =>
        (currCountry.stat > nextCountry.stat) ? -1 : 1
    );
}