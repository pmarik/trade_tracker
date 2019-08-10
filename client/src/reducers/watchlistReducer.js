import { GET_CALCULATOR_VALS } from '../actions/types'

const initialState = {
        portfolio: 2000,
        riskPercent: 3,
        riskDollarValue: 60,
        ticker: '',
        buyPrice: '',
        stopPrice: '',
        numShares: '',
        target: 0,
        isLong: false,
        totalPrice: '',
        canAfford: false,
        isVisible: false
}

export default function(state = initialState, action) {
    switch(action.type){
        case GET_CALCULATOR_VALS:
            return state
        default:
            return state
    }
}