import { SET_RISK_PERCENT, SET_PORTFOLIO_VALUE, CALCULATE_RISK, RESET_CALCULATOR, CALCULATOR_CHANGE, ADD_WATCHLIST_ITEM, DELETE_WATCH_ITEM, GET_TOTAL_PORTFOLIO, GET_RISK_PERCENT } from '../actions/types'

const initialState = {
        watchlist: [],
        portfolio: 2000,
        totalPortfolio: 0,
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

        // case GET_RISK_PERCENT:
        //     const updatedRisk = action.riskPercent * action.totalPortfolio
        //     return {
        //         riskPercent: updatedRisk
        //     }

        case SET_PORTFOLIO_VALUE:
            return {
                ...state,
                portfolio: action.portfolioValue,
                riskDollarValue: action.riskDollars,
            }

        case GET_TOTAL_PORTFOLIO:

            const portfolioTotal = parseInt(action.totalPL, 10) + parseInt(state.portfolio, 10)
            const totalRiskDollar = portfolioTotal * (state.riskPercent * .01)
            return{
                ...state,
                totalPortfolio: portfolioTotal,
                riskDollarValue: totalRiskDollar
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
                watchStop: action.stopPrice,
                watchId: action.id
             }
            return {
                ...state,
                watchlist: [...state.watchlist, addedWatch ]
            }

        case DELETE_WATCH_ITEM:
            let newWatchlist = state.watchlist.filter(item => {return item.watchId !== action.id})
            return {
                ...state,
                watchlist: newWatchlist
            }


      

        default:
            return state
    }
}