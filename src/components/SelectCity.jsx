import { Box, InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react';
import { useCities } from '../contexts/CitiesContext';

const SelectCity = (props) => {

    const { cities } = useCities();

    const { onChange, value } = props;

    return <Select
        labelId="select-city-label"
        id="select-city"
        onChange={onChange}
        sx={{ maxHeight: 40, minWidth: 300 }}
        value={value}
    >
        {!!cities && Array.isArray(cities) &&
            cities
                .sort((a, b) => a.name > b.name)
                .map(city => <MenuItem key={city.name} value={city}>{city.name}</MenuItem>)
        }
    </Select>

};

SelectCity.defaultProps = {
    onChange: event => console.warn("Not implemented"),
    value: undefined
};

export { SelectCity };
