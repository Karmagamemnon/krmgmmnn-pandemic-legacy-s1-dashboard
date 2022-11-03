import DashboardIcon from '@mui/icons-material/Dashboard';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import { AppBar, Box, Container, IconButton, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { useCities } from '../contexts/CitiesContext';

export const Layout = (props) => {

    const { reset } = useCities();

    const classes = {
        content: {
            backgroundColor: "white",
            minHeight: "90vh"
        },
        link: { color: "white" },
    };

    return <Container maxWidth="lg">
        <AppBar position="static">
            <Toolbar>
                <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px" }}>
                    <DashboardIcon fontSize="large" color="inherit" />
                    <Typography sx={classes.link} variant="h5">
                        Pandemic Legacy Season 1 dashboard
                    </Typography>
                    <IconButton edge="start" color="inherit" aria-label="menu" onClick={reset}>
                        <RotateLeftIcon fontSize="large" color="inherit" />
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
        <Box sx={classes.content}>
            {props.children}
        </Box>
    </Container>

}