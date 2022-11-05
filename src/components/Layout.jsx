import DashboardIcon from '@mui/icons-material/Dashboard';
import { AppBar, Box, Container, Toolbar, Typography } from '@mui/material';
import React from 'react';

export const Layout = (props) => {

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
                </Box>
            </Toolbar>
        </AppBar>
        <Box sx={classes.content}>
            {props.children}
        </Box>
    </Container>

}