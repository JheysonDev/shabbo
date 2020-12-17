import mainReducer from '../reducers/client/mainReducer';
import userReducer from '../reducers/client/userReducer';
import { createStore, combineReducers } from 'redux';

const clientStore = createStore(combineReducers({
    main: mainReducer,
    user: userReducer,
}));

export default clientStore;
