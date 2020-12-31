import Connection from "@Communication/Connection";
import Packet from "@Communication/incoming/Packet";
import PacketEvent from "@Communication/incoming/PacketEvent";
import SHabbo from "@SHabbo";

class UserMoveEvent implements PacketEvent {
    async execute(_connection: Connection, packet: Packet): Promise<void> {
        const user_id = await packet.readInteger();
        const x = await packet.readInteger();
        const y = await packet.readInteger();
        const z = await packet.readInteger();
        const rotation = await packet.readInteger();

        const avatar = SHabbo.getHotelManager().getRoomManager().getUser(user_id);
        if (avatar) {
            avatar.walk(x, y, z, { direction: rotation });
        }
    }
}

export default UserMoveEvent;
