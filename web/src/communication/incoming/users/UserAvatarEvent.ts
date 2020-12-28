import HotelManager from "../../../HabboHotel/HotelManager";
import Connection from "../../Connection";
import Packet from "../Packet";
import PacketEvent from "../PacketEvent";

class UserAvatarEvent implements PacketEvent {
    async execute(_connection: Connection, packet: Packet): Promise<void> {
        const look = await packet.readString();
        const gender = await packet.readString();
        const motto = await packet.readString();

        HotelManager.getUserManager().setData({
            look,
            gender: gender === 'M' ? 'M' : 'F',
            motto
        });
    }
}

export default UserAvatarEvent;
