import { MenuItem, Select } from '@mui/material';
import React from 'react';
import { useGameData } from '../contexts/GameDataContext';

const SelectFundingLevel = () => {

    const { gameData, setFundingLevel } = useGameData();

    return <Select
        onChange={(event) => setFundingLevel(event.target.value)}
        sx={{ maxHeight: 40, backgroundColor: "white" }}
        value={gameData.fundingLevel || 0}
    >
        <MenuItem value={0}>0</MenuItem>
        <MenuItem value={2}>2</MenuItem>
        <MenuItem value={4}>4</MenuItem>
        <MenuItem value={6}>6</MenuItem>
        <MenuItem value={8}>8</MenuItem>
        <MenuItem value={10}>10</MenuItem>
    </Select>

};

export { SelectFundingLevel };

