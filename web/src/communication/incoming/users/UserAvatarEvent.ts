import Connection from "@Communication/Connection";
import SHabbo from "@SHabbo";
import Packet from "../Packet";
import PacketEvent from "../PacketEvent";

class UserAvatarEvent implements PacketEvent {
    async execute(_connection: Connection, packet: Packet): Promise<void> {
        const look = await packet.readString();
        const gender = await packet.readString();
        const motto = await packet.readString();

        SHabbo.getHotelManager().getUserManager().setData({
            look,
            gender: gender === 'M' ? 'M' : 'F',
            motto
        });
    }
}

export default UserAvatarEvent;
