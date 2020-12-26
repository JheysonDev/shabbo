import { createStore, combineReducers } from "redux";
import mainReducer from "../reducers/client/mainReducer";
import userReducer from "../reducers/client/userReducer";

const clientStore = createStore(combineReducers({
    main: mainReducer,
    user: userReducer,
}));

export default clientStore;
