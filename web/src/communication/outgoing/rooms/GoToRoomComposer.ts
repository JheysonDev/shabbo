import PacketComposer from "../PacketComposer";

class GoToRoomComposer extends PacketComposer {
    constructor(room_id: number) {
        super('go_to_room');

        this.writeInteger(room_id);
    }
}

export default GoToRoomComposer;
