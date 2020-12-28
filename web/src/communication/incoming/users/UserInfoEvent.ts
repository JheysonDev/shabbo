import HotelManager from "../../../HabboHotel/HotelManager";
import Connection from "../../Connection";
import Packet from "../Packet";
import PacketEvent from "../PacketEvent";

class UserInfoEvent implements PacketEvent {
    async execute(_connection: Connection, packet: Packet): Promise<void> {
        const userID = await packet.readInteger();
        const username = await packet.readString();

        HotelManager.getUserManager().setData({ id: userID, username });
    }
}

export default UserInfoEvent;
