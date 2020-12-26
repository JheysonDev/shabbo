import PacketComposer from "../PacketComposer";

class OpenCreateRoomComposer extends PacketComposer {
    constructor() {
        super('open_create_room');
    }
}

export default OpenCreateRoomComposer;
