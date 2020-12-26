import Connection from "@Communication/Connection";
import NavigatorRoomModelsComposer from "@Communication/outgoing/navigator/NavigatorRoomModelsComposer";
import PacketEvent from "../PacketEvent";

class OpenCreateRoomEvent implements PacketEvent {
    async execute(connection: Connection): Promise<void> {
        await connection.sendPacket(new NavigatorRoomModelsComposer());
    }
}

export default OpenCreateRoomEvent;
