import React from 'react';
import { CitiesProvider } from '../contexts/CitiesContext';
import { Layout } from './Layout';

export const App = (props) => {

    return <CitiesProvider>
        <Layout>
            {props.children}
        </Layout>
    </CitiesProvider>;

};