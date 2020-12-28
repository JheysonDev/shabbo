interface IRoomModel {
    id: number;
    floor: string;
    door: Point;

    rooms: IRoom[];
    navigator_rooms: INavigatorRoom[];
}
