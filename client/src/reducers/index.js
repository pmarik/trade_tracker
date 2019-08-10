import { combineReducers } from 'redux';
import itemReducer from './itemReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import watchlistReducer from './watchlistReducer'

export default combineReducers({
    item: itemReducer,
    error: errorReducer,
    auth: authReducer,
    watch: watchlistReducer
})