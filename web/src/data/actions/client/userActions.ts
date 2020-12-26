export const SET_CONNECTED = 'SET_CONNECTED';

export function setConnected(connected: boolean): Action<boolean> {
    return {
        type: SET_CONNECTED,
        payload: connected,
    }
}

export const SET_USER_DATA = 'SET_USER_DATA';

export function setUserData(data: Partial<IUser>): Action<Partial<IUser>> {
    return {
        type: SET_USER_DATA,
        payload: data,
    };
}
