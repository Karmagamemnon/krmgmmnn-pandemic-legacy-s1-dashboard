import CoronavirusIcon from '@mui/icons-material/Coronavirus';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import React from 'react';
import { useCities } from '../contexts/CitiesContext';

const TableCities = () => {

    const { cities, cureCity, infestCity } = useCities();

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
        const { isDrawn, lastOutbreakIndex } = city;
        let icons = [];
        if (isDrawn) return <CoronavirusIcon fontSize="large" color="error" />;
        else if (lastOutbreakIndex > 0) return <CoronavirusIcon fontSize="large" sx={{ color: "gold" }} />;
        else return <CoronavirusIcon fontSize="large" color="inherit" />;
        return icons;
    };

    return <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small">
            <TableHead>
                <TableRow>
                    <TableCell sx={{ maxWidth: 20 }}></TableCell>
                    <TableCell>Ville</TableCell>
                    <TableCell align="right">%</TableCell>
                    <TableCell>Infestées - Révélées - Total</TableCell>
                    <TableCell></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {!!cities && Array.isArray(cities) &&
                    cities
                        //.filter(city => city.risk > 0 || city.lastOutbreakIndex === 0)
                        .sort((a, b) => {
                            if (a.risk > b.risk) return -1;
                            if (a.risk < b.risk) return 1;
                            if (a.lastOutbreakIndex > b.lastOutbreakIndex) return -1;
                            if (a.lastOutbreakIndex < b.lastOutbreakIndex) return 1;
                            if (a.name > b.name) return 1;
                            if (a.name < b.name) return -1;
                            else return 0;
                        })
                        .map(city =>
                            <TableRow key={city.name} sx={{
                                "&:last-child td, &:last-child th": { border: 0 },
                                "&:hover": { backgroundColor: "lightgrey" },
                            }}>
                                <TableCell component="th" scope="row" sx={{ maxWidth: 20 }}><LocationCityIcon fontSize="large" sx={{ color: city.color }} /></TableCell>
                                <TableCell>{city.name}</TableCell>
                                <TableCell align="right">{_renderRisk(city)}</TableCell>
                                <TableCell>{_renderIcons(city)}</TableCell>
                                <TableCell>
                                    <Button disabled={city.isDrawn} onClick={() => infestCity(city.name)}>Infect</Button>
                                    <Button disabled={!city.isDrawn} onClick={() => cureCity(city.name)}>Cure</Button>
                                </TableCell>
                            </TableRow>
                        )
                }
            </TableBody>
        </Table>
    </TableContainer>

};

export { TableCities };

