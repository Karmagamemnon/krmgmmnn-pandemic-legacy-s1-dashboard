import { Box, Button } from '@mui/material';
import React, { useState } from 'react';
import { useCities } from '../../contexts/CitiesContext';
import { useGameData } from '../../contexts/GameDataContext';
import { SelectCity } from '../SelectCity';
import { TableCities } from '../TableCities';
import PaidIcon from '@mui/icons-material/Paid';
import { SelectFundingLevel } from '../SelectFundingLevel';
import { Statistics } from '../Statistics';

export const Home = (props) => {

    const { reset } = useCities();
    const { incrementEpidemicIndex } = useGameData();
    const [city, setCity] = useState({});

    return <Box>
        <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", gap: "8px", padding: "10px", backgroundColor: "lightgrey" }}>
            <Box sx={{ display: "flex", flexDirection: "row", gap: "8px" }}>
                <SelectCity
                    onChange={(event) => setCity(event.target.value)}
                    value={city}
                />
                <Button disabled={!city.name && !city.idDrawn} onClick={() => {
                    const index = incrementEpidemicIndex();
                    reset(city.name, index);
                    setCity({});
                }}>Epidémie</Button>

            </Box>
            <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "8px" }}>
                <SelectFundingLevel />
                <PaidIcon fontSize="large" color="inherit" />
            </Box>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "row", gap: "8px" }}>
            <TableCities />
            <Statistics />
        </Box>
    </Box>;

}