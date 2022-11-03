import CoronavirusIcon from '@mui/icons-material/Coronavirus';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import React from 'react';
import { useCities } from '../contexts/CitiesContext';

const TableCities = () => {

    const { cities, infestCity } = useCities();

    const _renderRisk = (city) => {
        const { risk } = city;
        const minRisk = Math.min(...cities.map(city => city.risk));
        const maxRisk = Math.max(...cities.map(city => city.risk));

        let color = "black";
        if (risk === minRisk) color = "blue";
        if (risk === maxRisk) color = "red";

        return <Typography sx={{ color }}>{`${(risk || 0.0).toFixed(2)} %`}</Typography>;
    };

    const _renderIcons = (city) => {
        const { infectionCards, drawnInfectionCards, revealedInfectionCards } = city;
        let icons = [];
        for (let i = 1; i <= drawnInfectionCards; i++) icons.push(<CoronavirusIcon key={`d${i}`} fontSize="large" color="error" />)
        for (let i = 1; i <= revealedInfectionCards - drawnInfectionCards; i++) icons.push(<CoronavirusIcon key={`r${i}`} fontSize="large" sx={{ color: "gold" }} />)
        for (let i = 1; i <= infectionCards - revealedInfectionCards; i++) icons.push(<CoronavirusIcon key={i} fontSize="large" color="inherit" />)
        return icons;
    };

    return <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small">
            <TableHead>
                <TableRow>
                    <TableCell>Ville</TableCell>
                    <TableCell align="right">%</TableCell>
                    <TableCell>Infestées - Révélées - Total</TableCell>
                    <TableCell></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {!!cities && Array.isArray(cities) &&
                    cities
                        .sort((a, b) => a.risk < b.risk)
                        .map(city =>
                            <TableRow key={city.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">{city.name}</TableCell>
                                <TableCell align="right">{_renderRisk(city)}</TableCell>
                                <TableCell>{_renderIcons(city)}</TableCell>
                                <TableCell>
                                    <Button disabled={city.drawnInfectionCards >= city.infectionCards} onClick={() => infestCity(city.name)}>Infect</Button>
                                </TableCell>
                            </TableRow>
                        )
                }
            </TableBody>
        </Table>
    </TableContainer>

};

export { TableCities };

