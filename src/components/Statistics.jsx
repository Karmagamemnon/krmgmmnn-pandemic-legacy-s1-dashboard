import { Divider, List, ListItem, ListItemText, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useCities } from '../contexts/CitiesContext';
import { useGameData } from '../contexts/GameDataContext';

const Statistics = () => {

    const { gameData } = useGameData();
    const { cities } = useCities();

    const { epidemicIndex, fundingLevel, infectionRate, totalDrawnInfectionCards, totalDrawnPlayerCards } = gameData;
    const totalPlayerCards = cities.length + 5 + 2 * fundingLevel;

    let stacks = [];
    for (let i = 0; i <= 4; i++)
        stacks[i] = {
            totalCards: 0,
            totalCardsPreviousStacks: 0,
        };
    for (let i = 1; i <= totalPlayerCards; i++) stacks[i % 5].totalCards++;
    stacks[5] = stacks[0];

    stacks[1].totalCardsPreviousStacks = 0;
    stacks[2].totalCardsPreviousStacks = stacks[1].totalCards;
    stacks[3].totalCardsPreviousStacks = stacks[2].totalCardsPreviousStacks + stacks[2].totalCards;
    stacks[4].totalCardsPreviousStacks = stacks[3].totalCardsPreviousStacks + stacks[3].totalCards;
    stacks[5].totalCardsPreviousStacks = stacks[4].totalCardsPreviousStacks + stacks[4].totalCards;

    return <Box sx={{ minWidth: 250 }}>
        <List sx={{ position: "fixed", width: 240 }} dense>
        <ListItem>
                <ListItemText primary="Vitesse de propagation" />
                <Typography edge="end">{infectionRate}</Typography>
            </ListItem>

            <Divider />

            <ListItem>
                <ListItemText primary="Total cartes Infection" />
                <Typography edge="end">{cities.length}</Typography>
            </ListItem>
            <ListItem>
                <ListItemText primary="Total cartes Joueur" />
                <Typography edge="end">{totalPlayerCards}</Typography>
            </ListItem>

            <Divider />

            <ListItem>
                <ListItemText primary="Cartes Infection piochées" />
                <Typography edge="end">{totalDrawnInfectionCards}</Typography>
            </ListItem>
            <ListItem>
                <ListItemText primary="Cartes Joueur piochées" />
                <Typography edge="end">{totalDrawnPlayerCards}</Typography>
            </ListItem>
            <ListItem>
                <ListItemText primary="Cartes Joueur restantes" />
                <Typography edge="end">{totalPlayerCards - totalDrawnPlayerCards}</Typography>
            </ListItem>
            <ListItem>
                <ListItemText primary="Tour restants" />
                <Typography edge="end">{Math.floor((totalPlayerCards - totalDrawnPlayerCards) / 2)}</Typography>
            </ListItem>

            <Divider />

            {stacks.map((stack, index) => {
                if (index > epidemicIndex) return <ListItem key={index}>
                    <ListItemText primary={`Epidémie #${index}`} />
                    <Typography edge="end">{Math.max(1, stack.totalCardsPreviousStacks - totalDrawnPlayerCards + 1)} - {stack.totalCardsPreviousStacks - totalDrawnPlayerCards + stack.totalCards}</Typography>
                </ListItem>;
                else return null;
            })}

        </List>
    </Box>

};

export { Statistics };

