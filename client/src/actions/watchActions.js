import { SET_RISK_PERCENT, SET_PORTFOLIO_VALUE, CALCULATE_RISK, RESET_CALCULATOR, CALCULATOR_CHANGE, ADD_WATCHLIST_ITEM, DELETE_WATCH_ITEM, GET_TOTAL_PORTFOLIO, GET_RISK_PERCENT } from './types';

export const setRiskPercent = (riskPercent, riskDollars) => {
    return {
        type: SET_RISK_PERCENT,
        riskPercent,
        riskDollars
    }
}

// export const getRiskPercent = (riskPercent, totalPortfolio) => {
//     return {
//         type: GET_RISK_PERCENT,
//         riskPercent,
//         totalPortfolio
//     }
// }

export const setPortfolioValue = (portfolioValue, riskDollars) => {
    return {
        type: SET_PORTFOLIO_VALUE,
        portfolioValue,
        riskDollars
    }
}

export const getTotalPortfolio = (totalPL) => {
    return {
        type: GET_TOTAL_PORTFOLIO,
        totalPL
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

export const addWatchlistItem = (ticker, totalShares, buyPrice, stopPrice, id) => {
    return {
        type: ADD_WATCHLIST_ITEM,
        ticker,
        totalShares,
        buyPrice,
        stopPrice,
        id
    }
}

export const deleteWatchItem = (id) => (dispatch, getState) => {

    dispatch({
        type: DELETE_WATCH_ITEM,
        id
    })
}


