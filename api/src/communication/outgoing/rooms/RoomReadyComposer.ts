import PacketComposer from "../PacketComposer";

class RoomReadyComposer extends PacketComposer {
    constructor(roomID: number, floor: string) {
        super('room_ready');

        this.writeInteger(roomID);
        this.writeString(floor);
    }
}

export default RoomReadyComposer;
