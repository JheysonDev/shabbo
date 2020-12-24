import { SET_CONNECTED, SET_USER_AVATAR, SET_USER_CURRENCY, SET_USER_INFO } from "../../actions/client/userActions";

const initial_state: IUserState = {
    connected: false,
    user: {},
    
    current_room: 0,
};

const userReducer: Reducer<IUserState> = (state = initial_state, action) => {
    switch (action.type) {
        case SET_CONNECTED: return { ...state, connected: action.payload };

        case SET_USER_INFO: {
            const userState = state.user;

            return {
                ...state,
                user: { ...userState, info: action.payload },
            };
        }

        case SET_USER_CURRENCY: {
            const userState = state.user;

            return {
                ...state,
                user: { ...userState, currency: action.payload },
            };
        }

        case SET_USER_AVATAR: {
            const userState = state.user;

            return {
                ...state,
                user: { ...userState, avatar: action.payload },
            };
        }

        default: return state;
    }
};

export default userReducer;
