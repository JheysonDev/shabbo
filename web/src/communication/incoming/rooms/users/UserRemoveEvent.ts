import Connection from "@Communication/Connection";
import Packet from "@Communication/incoming/Packet";
import PacketEvent from "@Communication/incoming/PacketEvent";
import SHabbo from "@SHabbo";

class UserRemoveEvent implements PacketEvent {
    async execute(_connection: Connection, packet: Packet): Promise<void> {
        SHabbo.getHotelManager().getRoomManager().removeUser(await packet.readInteger());
    }
}

export default UserRemoveEvent;
