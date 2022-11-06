import { Box, Button } from '@mui/material';
import React, { useState } from 'react';
import { useCities } from '../../contexts/CitiesContext';
import { SelectCity } from '../SelectCity';
import { TableCities } from '../TableCities';

export const Home = (props) => {

    const { reset } = useCities();
    const [city, setCity] = useState({});
    const [outbreakIndex, setOutbreakIndex] = useState(1);

    return <Box>
        <Box sx={{ display: "flex", flexDirection: "rox", gap: "8px", padding: "10px", backgroundColor: "lightgrey" }}>
            <SelectCity
                onChange={(event) => setCity(event.target.value)}
                value={city}
            />
            <Button disabled={!city.name && !city.idDrawn} onClick={() => {
                reset(city.name, outbreakIndex);
                setOutbreakIndex(outbreakIndex + 1);
                setCity({});
            }}>Epidémie</Button>
        </Box>
        <TableCities />
    </Box>;

}