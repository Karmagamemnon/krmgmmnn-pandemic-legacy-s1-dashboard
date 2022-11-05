import { Box, Button } from '@mui/material';
import React, { useState } from 'react';
import { useCities } from '../../contexts/CitiesContext';
import { SelectCity } from '../SelectCity';
import { TableCities } from '../TableCities';

export const Home = (props) => {

    const { reset } = useCities();
    const [cityName, setCityName] = useState("");
    const [outbreakIndex, setOutbreakIndex] = useState(1);

    return <Box>
        <Box sx={{ display: "flex", flexDirection: "rox", gap: "8px" }}>
            <SelectCity
                onChange={(event) => setCityName(event.target.value.name)}
                value={cityName}
            />
            <Button onClick={() => {
                reset(cityName, outbreakIndex);
                setOutbreakIndex(outbreakIndex + 1);
            }}>Epidémie</Button>
        </Box>
        <TableCities />
    </Box>;

}