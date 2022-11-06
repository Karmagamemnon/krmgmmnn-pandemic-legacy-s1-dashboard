import CoronavirusIcon from '@mui/icons-material/Coronavirus';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import { Box } from '@mui/system';
import React from 'react';
import { useCities } from '../contexts/CitiesContext';
import { useGameData } from '../contexts/GameDataContext';

const TableCities = () => {

    const { cities, cureCity, infestCity } = useCities();
    const { incrementTotalDrawnInfectionCards } = useGameData();

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
        const { isDrawn, lastEpidemicIndex } = city;
        if (isDrawn) return <CoronavirusIcon fontSize="medium" color="error" />;
        else if (lastEpidemicIndex > 0) return <CoronavirusIcon fontSize="medium" sx={{ color: "gold" }} />;
        else return <CoronavirusIcon fontSize="medium" color="inherit" />;
    };

    return <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small">
            <TableHead>
                <TableRow>
                    <TableCell>Ville</TableCell>
                    <TableCell></TableCell>
                    <TableCell align="right">%</TableCell>
                    <TableCell>Infestées - Révélées - Total</TableCell>
                    <TableCell></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {!!cities && Array.isArray(cities) &&
                    cities
                        //.filter(city => city.risk > 0 || city.lastEpidemicIndex === 0)
                        .sort((a, b) => {
                            if (a.risk > b.risk) return -1;
                            if (a.risk < b.risk) return 1;
                            if (a.lastEpidemicIndex > b.lastEpidemicIndex) return -1;
                            if (a.lastEpidemicIndex < b.lastEpidemicIndex) return 1;
                            if (a.name > b.name) return 1;
                            if (a.name < b.name) return -1;
                            else return 0;
                        })
                        .map(city =>
                            <TableRow key={city.name} sx={{
                                "&:last-child td, &:last-child th": { border: 0 },
                                "&:hover": { backgroundColor: "lightgrey" },
                            }}>
                                <TableCell component="th" scope="row" >
                                    <Box sx={{ display: "flex", flexDirection: "row", alignItems: "flex-end", gap: "8px" }}>
                                        <LocationCityIcon fontSize="medium" sx={{ color: city.color }} />
                                        <Typography>{city.name}</Typography>
                                    </Box>
                                </TableCell>
                                <TableCell>{city.lastEpidemicIndex}</TableCell>
                                <TableCell align="right">{_renderRisk(city)}</TableCell>
                                <TableCell>{_renderIcons(city)}</TableCell>
                                <TableCell>
                                    <Button
                                        disabled={city.isDrawn}
                                        onClick={() => {
                                            incrementTotalDrawnInfectionCards();
                                            infestCity(city.name);
                                        }}
                                        sx={{ padding: 0, maxHeight: 20 }}
                                    >
                                        Infect
                                    </Button>
                                    {/* <Button disabled={!city.isDrawn} onClick={() => cureCity(city.name)} sx={{ padding: 0, maxHeight: 20 }}>Cure</Button> */}
                                </TableCell>
                            </TableRow>
                        )
                }
            </TableBody>
        </Table>
    </TableContainer>

};

export { TableCities };

