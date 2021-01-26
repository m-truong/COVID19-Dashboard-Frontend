/** 
 * This sortCountriesTable() uses '.sort' to sort the countries.
 * 1. If currCountry # cases is greater, returns -1, sorts to an
 * index lower than nextCountry, and currCountry comes first 
 * 2. If currCountry # cases is NOT greater, returns 1, sorts 
 * nextCountry to index lower than currCountry, and nextCountry 
 * comes first 
 */

export const sortCountriesTable = (data) => {
    const sortedCountries = [...data]
    return sortedCountries.sort((currCountry, nextCountry) =>
        (currCountry.cases > nextCountry.cases) ? -1 : 1
    );
}