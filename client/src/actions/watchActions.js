import { SET_RISK_PERCENT, SET_PORTFOLIO_VALUE, CALCULATE_RISK, RESET_CALCULATOR, CALCULATOR_CHANGE, ADD_WATCHLIST_ITEM  } from './types';



export const setRiskPercent = (riskPercent, riskDollars) => {
    return {
        type: SET_RISK_PERCENT,
        riskPercent,
        riskDollars
    }
}

export const setPortfolioValue = (portfolioValue, riskDollars) => {
    return {
        type: SET_PORTFOLIO_VALUE,
        portfolioValue,
        riskDollars
    }
}

export const calculateRisk = (target, totalPrice, totalShares) => {
    return {
        type: CALCULATE_RISK,
        target,
        totalPrice,
        totalShares
    }
}

export const resetStateCalculator = () => {
    return {
        type: RESET_CALCULATOR
    }
}

export const handleCalculatorChange = (name, value) => {
    return {
        type: CALCULATOR_CHANGE,
        name,
        value
    }
}

export const addWatchlistItem = (ticker, totalShares, buyPrice, stopPrice) => {
    return {
        type: ADD_WATCHLIST_ITEM,
        ticker,
        totalShares,
        buyPrice,
        stopPrice
    }
}

