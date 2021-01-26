import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import '../Styles/CountriesTable.css'

function CountriesTable({ countries }) {
    console.log(countries) // raw data ARRAY-JSON object
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
                        countries.map(({ country, cases }) => {
                            { console.log(country, cases) }
                            // need explicit return
                            return (
                                // wrap containing element
                                <TableRow>
                                    <TableCell>{country}</TableCell>
                                    <TableCell align="right"><strong>{cases}</strong></TableCell>
                                </TableRow>
                            )
                        })
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default CountriesTable