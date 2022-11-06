import { Box, Container } from '@mui/material';
import React from 'react';

export const Layout = (props) => {

    return <Container maxWidth="lg">
        <Box sx={{ backgroundColor: "white", minHeight: "90vh" }}>
            {props.children}
        </Box>
    </Container>;

};