import { SET_NAVIGATOR_ROOMS } from "../../actions/client/mainActions";

const initial_state: IMainState = {
    navigator_models: [],
};

const mainReducer: Reducer<IMainState> = (state = initial_state, action) => {
    switch (action.type) {
        case SET_NAVIGATOR_ROOMS: return { ...state, navigator_models: action.payload };
        default: return state;
    }
};

export default mainReducer;
