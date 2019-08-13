import { SET_RISK_PERCENT, SET_PORTFOLIO_VALUE, CALCULATE_RISK, RESET_CALCULATOR, CALCULATOR_CHANGE, ADD_WATCHLIST_ITEM } from '../actions/types'

const initialState = {
        watchlist: [],
        portfolio: 2000,
        riskPercent: 3,
        riskDollarValue: 60,
        ticker: '',
        buyPrice: '',
        stopPrice: '',
        numShares: '',
        target: 0,
        totalPrice: ''
}

export default function(state = initialState, action) {
    switch(action.type){
        case SET_RISK_PERCENT:
            return {
                ...state,
                riskPercent: action.riskPercent,
                riskDollarValue: action.riskDollars
            }

        case SET_PORTFOLIO_VALUE:
            return {
                ...state,
                portfolio: action.portfolioValue,
                riskDollarValue: action.riskDollars
            }

        case CALCULATE_RISK: 
            return {
                ...state,
                target: action.target,
                totalPrice: action.totalPrice,
                numShares: action.totalShares
            }

        case RESET_CALCULATOR:
            return {
                ...state,
                ticker: '',
                buyPrice: '',
                stopPrice: '',
                numShares: '',
                sellStop: '',
                target: 0,
                totalPrice: '',
            }

        case CALCULATOR_CHANGE:
            let name = action.name
            return {
                ...state,
                [name]: action.value
            }


        case ADD_WATCHLIST_ITEM:
            const addedWatch = {
                watchTicker: action.ticker,
                watchShares: action.totalShares,
                watchBuy: action.buyPrice,
                watchStop: action.stopPrice
             }
            return {
                ...state,
                watchlist: [...state.watchlist, addedWatch ]
            }

        default:
            return state
    }
}