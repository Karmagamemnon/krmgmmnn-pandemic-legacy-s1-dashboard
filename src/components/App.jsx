import React from 'react';
import { CitiesProvider } from '../contexts/CitiesContext';
import { GameDataProvider } from '../contexts/GameDataContext';
import { Layout } from './Layout';

export const App = (props) => {

    return <CitiesProvider>
        <GameDataProvider>
            <Layout>
                {props.children}
            </Layout>
        </GameDataProvider>
    </CitiesProvider>;

};