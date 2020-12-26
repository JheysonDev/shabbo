import { SET_CONNECTED, SET_USER_DATA } from "../../actions/client/userActions";

const initial_state: IUserState = {
    connected: false,
    data: null,

    current_room: 0,
};

const userReducer: Reducer<IUserState> = (state = initial_state, action) => {
    switch (action.type) {
        case SET_CONNECTED: return { ...state, connected: action.payload };

        case SET_USER_DATA: {
            if (state.data) {
                return {
                    ...state,
                    data: { ...state.data, ...action.payload },
                };
            }

            return {
                ...state,
                data: {
                    id: 0,
                    username: '',
                    gender: 'M',
                    look: '',
                    motto: '',
                    online: true,
                    credits: 0,
                    diamonds: 0,
                    ...action.payload,
                },
            };
        }

        default: return state;
    }
};

export default userReducer;
