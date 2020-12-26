export const SET_NAVIGATOR_ROOMS = 'SET_NAVIGATOR_ROOMS';

export function setNavigatorRooms(data: INavigatorRoom[]): Action<INavigatorRoom[]> {
    return {
        type: SET_NAVIGATOR_ROOMS,
        payload: data,
    };
}
