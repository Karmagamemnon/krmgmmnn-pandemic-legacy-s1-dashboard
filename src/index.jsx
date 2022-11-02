import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './components/App';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import reportWebVitals from './reportWebVitals';

import { Home } from './components/pages/Home';

import cities from './data/cities.json';

import "./index.css";

if (localStorage.getItem("cities") === null)
    localStorage.setItem("cities", JSON.stringify(cities));

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <App>
                <Routes>
                    <Route exact path="/" component={Home} />
                </Routes>
            </App>
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
