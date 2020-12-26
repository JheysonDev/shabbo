interface IRoomItem {
    id: number;
    room: IRoom | null;
    owner: IUser;
    item: IItem;
    x: number;
    y: number;
    z: number;
    rotation: number;
}
