export const SET_CONNECTED = 'SET_CONNECTED';

export function setConnected(connected: boolean): Action<boolean> {
    return {
        type: SET_CONNECTED,
        payload: connected,
    }
}

export const SET_USER_INFO = 'SET_USER_INFO';

export function setUserInfo(userInfo: IUserInfo): Action<IUserInfo> {
    return {
        type: SET_USER_INFO,
        payload: userInfo,
    };
}

export const SET_USER_CURRENCY = 'SET_USER_CURRENCY';

export function setUserCurrency(userCurrency: IUserCurrency): Action<IUserCurrency> {
    return {
        type: SET_USER_CURRENCY,
        payload: userCurrency,
    };
}

export const SET_USER_AVATAR = 'SET_USER_AVATAR';

export function setUserAvatar(userAvatar: IUserAvatar): Action<IUserAvatar> {
    return {
        type: SET_USER_AVATAR,
        payload: userAvatar,
    };
}
