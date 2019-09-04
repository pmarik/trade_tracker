
import { GET_ITEMS, ADD_ITEM, UPDATE_ITEM, DELETE_ITEM, ITEMS_LOADING } from '../actions/types'

const initialState = {
    items: [],
    loading: false,
    item: []
}

export default function(state = initialState, action){
    switch(action.type) {
        case GET_ITEMS:
            return {
                ...state,
                items: action.payload,
                loading: false
            }
  
        case UPDATE_ITEM:
            let newItems = state.items.slice();
            
            let origItem = state.items.findIndex(trade => 
                trade._id === action.payload._id
            )

            newItems[origItem] = action.payload

            console.log(action.payload);
            return{
                ...state,
                items: newItems,
                loading: false
            }
            
        case DELETE_ITEM:
            return {
                ...state,
                items: state.items.filter(item => item._id !== action.payload)
            }

        case ADD_ITEM:
            return {
                ...state,
                items: [...state.items, action.payload]
            }

        case ITEMS_LOADING:
                return {
                    ...state,
                    loading: true
                }
        default: 
            return state;
    }
}