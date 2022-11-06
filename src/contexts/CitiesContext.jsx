import React from 'react';
import citiesDb from '../data/cities.json';

const determinateRisks = (cities) => {
    const undrawnCities = cities.filter(city => !city.isDrawn);
    const lastIndex = Math.max(...undrawnCities.map(city => city.lastEpidemicIndex));
    const citiesOnTop = cities.filter(city => city.lastEpidemicIndex === lastIndex);

    return cities.map(city => {
        const { isDrawn, lastEpidemicIndex } = city;
        const totalDrawnCards = citiesOnTop.reduce((a, b) => a + (b.isDrawn ? 1 : 0), 0);

        let risk = 0;
        if (!isDrawn && lastEpidemicIndex === lastIndex)
            risk = 100 * 1 / (citiesOnTop.length - totalDrawnCards);

        risk = Math.round(risk * 100) / 100;

        return { ...city, risk };
    });
};

const initialize = (cities) => {
    return cities.map(city => ({
        ...city,
        isDrawn: false,
        lastEpidemicIndex: 0
    }));
};

const initializedCities = initialize(citiesDb);
const citiesWithRisks = determinateRisks(initializedCities);
const CitiesContext = React.createContext();

const useCities = () => {
    const [cities, setCities] = React.useContext(CitiesContext);

    const infestCity = (cityName) => {
        let updatedCities = [...cities];
        const index = updatedCities.findIndex(city => city.name === cityName);
        let city = updatedCities[index];
        city.isDrawn = true;
        updatedCities.splice(index, 1);
        updatedCities.push(city);
        updatedCities = determinateRisks(updatedCities);
        setCities(updatedCities);
    };

    const cureCity = (cityName) => {
        let updatedCities = [...cities];
        const index = updatedCities.findIndex(city => city.name === cityName);
        let city = updatedCities[index];
        city.isDrawn = false;
        updatedCities.splice(index, 1);
        updatedCities.push(city);
        updatedCities = determinateRisks(updatedCities);
        setCities(updatedCities);
    };

    const reset = (cityName, epidemicIndex) => {
        let updatedCities = cities.map(city => {
            let newCity = { ...city };
            if (newCity.isDrawn || newCity.name === cityName) newCity.lastEpidemicIndex = epidemicIndex;
            newCity.isDrawn = false;
            return newCity;
        });
        updatedCities = determinateRisks(updatedCities);
        setCities(updatedCities);
    };

    return { cities, cureCity, infestCity, reset };
};

const CitiesProvider = ({ children }) => {
    const [cities, setCities] = React.useState(citiesWithRisks);
    return <CitiesContext.Provider value={[cities, setCities]}>
        {children}
    </CitiesContext.Provider>;
};

export { CitiesProvider, useCities };