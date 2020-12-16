interface IRoomModel {
    id: number;
    floor: string;
    door: { x: number, y: number, z: number };
}

export default IRoomModel;
