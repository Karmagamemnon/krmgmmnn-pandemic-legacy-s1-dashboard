import CoronavirusIcon from '@mui/icons-material/Coronavirus';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React from 'react';
import Paper from '@mui/material/Paper';
import { useCities } from '../contexts/CitiesContext';

const TableInfested = () => {

    const { cities } = useCities();

    const _renderIcons = (n) => {
        let icons = [];
        for (let i = 1; i <= n; i++) icons.push(<CoronavirusIcon key={i} fontSize="large" color="inherit" />)
        return icons;
    }

    return <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small">
            <TableHead>
                <TableRow>
                    <TableCell>Ville</TableCell>
                    <TableCell>#</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {!!cities && Array.isArray(cities) &&
                    cities
                        .filter(city => city.drawnInfectionCards > 0)
                        .map(city =>
                            <TableRow key={city.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">{city.name}</TableCell>
                                <TableCell align="right">{_renderIcons(city.drawnInfectionCards)}</TableCell>
                            </TableRow>
                        )
                }

            </TableBody>
        </Table>
    </TableContainer>

};

export { TableInfested };
