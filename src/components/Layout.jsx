import { AppBar, Box, Container, IconButton, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { Link } from "react-router-dom";

import DashboardIcon from '@mui/icons-material/Dashboard';

export const Layout = (props) => {

    const classes = {
        content: {
            backgroundColor: "white",
            minHeight: "90vh"
        },
        homeButton: { marginRight: "2px" },
        link: { color: "white" },
    };

    return <Container maxWidth="lg">
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" sx={classes.homeButton} color="inherit" aria-label="menu">
                    <Link to="/" style={{ color: 'inherit' }}>
                        <DashboardIcon fontSize="large" color="inherit" />
                    </Link>
                </IconButton>
                <Typography sx={classes.link} variant="h5">
                    Pandemic Legacy Season 1 dashboard
                </Typography>
            </Toolbar>
        </AppBar>
        <Box sx={classes.content}>
            {props.children}
        </Box>
    </Container>

}