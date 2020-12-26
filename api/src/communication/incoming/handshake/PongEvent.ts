import Connection from "@Communication/Connection";
import PingComposer from "@Communication/outgoing/handshake/PingComposer";
import Packet from "../Packet";
import PacketEvent from "../PacketEvent";

class PongEvent implements PacketEvent {
    async execute(connection: Connection, packet: Packet): Promise<void> {
        setTimeout(async () => {
            await connection.sendPacket(new PingComposer(await packet.readInteger()));
        }, 8000);
    }
}

export default PongEvent;
