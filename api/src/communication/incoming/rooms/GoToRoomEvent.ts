import Connection from "@Communication/Connection";
import Packet from "../Packet";
import PacketEvent from "../PacketEvent";

class GoToRoomEvent implements PacketEvent {
    async execute(connection: Connection, packet: Packet): Promise<void> {
        const roomID: number = await packet.readInteger();
        const user = await connection.getUser();

        await user.getHabbo().goToRoom(roomID);
    }
}

export default GoToRoomEvent;
