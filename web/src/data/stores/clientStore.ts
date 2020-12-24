import userReducer from "../reducers/client/userReducer";
import { createStore, combineReducers } from "redux";

const clientStore = createStore(combineReducers({
    user: userReducer,
}));

export default clientStore;
