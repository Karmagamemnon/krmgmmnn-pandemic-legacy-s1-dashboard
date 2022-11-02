import React from 'react';
import { Layout } from './Layout';

export const App = (props) => {

    return <Layout>
        {props.children}
    </Layout>

}