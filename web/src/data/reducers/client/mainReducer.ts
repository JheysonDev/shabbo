import IMainState from "../../../interfaces/client/states/IMainState";
import { SET_GAME_APPLICATION, SET_GAME_MANAGER } from "../../actions/client/mainActions";
import Reducer from "../Reducer";

const initial_state: IMainState = {
    gameApplication: null,
    gameManager: null,
};

const mainReducer: Reducer<IMainState> = (state = initial_state, action) => {
    switch (action.type) {
        case SET_GAME_APPLICATION: return { ...state, gameApplication: action.payload };
        case SET_GAME_MANAGER: return { ...state, gameManager: action.payload };
        default: return state;
    }
};

export default mainReducer;
