import Connection from "@Communication/Connection";
import PongComposer from "@Communication/outgoing/handshake/PongComposer";
import Packet from "../Packet";
import PacketEvent from "../PacketEvent";

class PingEvent implements PacketEvent {
    async execute(connection: Connection, packet: Packet): Promise<void> {
        await connection.sendPacket(new PongComposer(await packet.readInteger()));
    }
}

export default PingEvent;
