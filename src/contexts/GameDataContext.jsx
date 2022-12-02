import React from 'react';

const GameDataContext = React.createContext();

const useGameData = () => {
    const [gameData, setGameData] = React.useContext(GameDataContext);

    const incrementEpidemicIndex = () => {
        let updatedGameData = { ...gameData };
        updatedGameData.epidemicIndex++;

        switch (updatedGameData.epidemicIndex) {
            case 0:
            case 1:
            case 2: updatedGameData.infectionRate = 2; break;
            case 3:
            case 4: updatedGameData.infectionRate = 3; break;
            case 5:
            case 6: updatedGameData.infectionRate = 4; break;
            default: break;
        }

        setGameData(updatedGameData);
        return updatedGameData.epidemicIndex;
    };

    const incrementTotalDrawnInfectionCards = () => {
        let updatedGameData = { ...gameData };
        updatedGameData.totalDrawnInfectionCards++;

        const ratio = 2 / updatedGameData.infectionRate;
        if (updatedGameData.totalDrawnInfectionCards > 9)
            updatedGameData.totalDrawnPlayerCards += Math.round(ratio * 100) / 100;

        setGameData(updatedGameData);
        return updatedGameData.epidemicIndex;
    };

    const setFundingLevel = (level) => {
        let updatedGameData = { ...gameData };
        updatedGameData.fundingLevel = level;
        setGameData(updatedGameData);
    };

    return { gameData, incrementEpidemicIndex, incrementTotalDrawnInfectionCards, setFundingLevel };
};

const GameDataProvider = ({ children }) => {
    const [gameData, setGameData] = React.useState({
        epidemicIndex: 0,
        fundingLevel: 4,
        infectionRate: 2,
        totalDrawnInfectionCards: 0,
        totalDrawnPlayerCards: 0,
    });
    return <GameDataContext.Provider value={[gameData, setGameData]}>
        {children}
    </GameDataContext.Provider>;
};

export { GameDataProvider, useGameData };