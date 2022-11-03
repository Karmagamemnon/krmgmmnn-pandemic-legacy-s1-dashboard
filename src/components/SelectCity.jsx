import { Box, InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react';
import { useCities } from '../contexts/CitiesContext';

const SelectCity = (props) => {

    const { cities } = useCities();

    const { onChange, value } = props;

    return <Box>

        <InputLabel id="select-city-label">Ville</InputLabel>
        <Select
            labelId="select-city-label"
            id="select-city"
            onChange={onChange}
            sx={{ minWidth: 300 }}
            value={value}
        >
            {!!cities && Array.isArray(cities) &&
                cities
                    .sort()
                    .map(city => <MenuItem key={city.name} value={city}>{city.name}</MenuItem>)
            }
        </Select>

    </Box>

};

SelectCity.defaultProps = {
    onChange: event => console.warn("Not implemented"),
    value: undefined
};

export { SelectCity };
