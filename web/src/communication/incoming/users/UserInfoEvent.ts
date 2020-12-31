import Connection from "@Communication/Connection";
import SHabbo from "@SHabbo";
import Packet from "../Packet";
import PacketEvent from "../PacketEvent";

class UserInfoEvent implements PacketEvent {
    async execute(_connection: Connection, packet: Packet): Promise<void> {
        const userID = await packet.readInteger();
        const username = await packet.readString();

        SHabbo.getHotelManager().getUserManager().setData({ id: userID, username });
    }
}

export default UserInfoEvent;
