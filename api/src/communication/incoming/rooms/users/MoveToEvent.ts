import Connection from "@Communication/Connection";
import Packet from "@Communication/incoming/Packet";
import PacketEvent from "@Communication/incoming/PacketEvent";

class MoveToEvent implements PacketEvent {
    async execute(connection: Connection, packet: Packet): Promise<void> {
        const habbo = (await connection.getUser()).getHabbo();

        if (!habbo.inRoom()) {
            return;
        }

        const x = await packet.readInteger();
        const y = await packet.readInteger();

        if (x === habbo.getCoords().x && y === habbo.getCoords().y) {
            return;
        }

        habbo.moveTo(x, y);
    }
}

export default MoveToEvent;
