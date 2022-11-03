import React from 'react';
import citiesDb from '../data/cities.json';

const determinateRisks = (cities) => {
    return cities.map(city => {
        const { infectionCards, drawnInfectionCards, revealedInfectionCards } = city;

        const totalCards = cities.reduce((a, b) => a + b.infectionCards, 0);
        const totalRevealedCards = cities.reduce((a, b) => a + b.revealedInfectionCards, 0);
        const totalDrawnCards = cities.reduce((a, b) => a + b.drawnInfectionCards, 0);

        let risk = 0;
        if (totalDrawnCards >= totalRevealedCards) risk = 100 * (infectionCards - drawnInfectionCards) / (totalCards - totalDrawnCards);
        else risk = 100 * (revealedInfectionCards - drawnInfectionCards) / (totalRevealedCards - totalDrawnCards);
        risk = Math.round(risk * 100) / 100;

        return { ...city, risk };
    });
};

const initialize = (cities) => {
    return cities.map(city => ({
        ...city,
        drawnInfectionCards: 0,
        revealedInfectionCards: 0,
        drawnPlayerCards: 0
    }));
};

const initializedCities = initialize(citiesDb);
const citiesWithRisks = determinateRisks(initializedCities);
const CitiesContext = React.createContext(citiesWithRisks);

const useCities = () => {
    const [cities, setCities] = React.useContext(CitiesContext);

    const infestCity = (cityName) => {
        let updatedCities = [...cities];
        const index = updatedCities.findIndex(city => city.name === cityName);
        let city = cities[index];
        city.drawnInfectionCards++;
        city.revealedInfectionCards = Math.max(city.revealedInfectionCards, city.drawnInfectionCards);
        updatedCities.splice(index, 1);
        updatedCities.push(city);
        updatedCities = determinateRisks(updatedCities);
        setCities(updatedCities);
    };

    const reset = () => {
        let updatedCities = cities.map(city => ({ ...city, drawnInfectionCards: 0 }));
        updatedCities = determinateRisks(updatedCities);
        setCities(updatedCities);
    };

    return { cities, infestCity, reset };
};

const CitiesProvider = ({ children }) => {
    const [cities, setCities] = React.useState(citiesWithRisks);
    return <CitiesContext.Provider value={[cities, setCities]}>
        {children}
    </CitiesContext.Provider>;
};

export { CitiesProvider, useCities };