interface IRoomModel {
    id: number;
    floor: string;
    door: { x: number, y: number, z: number };

    rooms: IRoom[];
    navigator_rooms: INavigatorRoom[];
}
