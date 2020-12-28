import HotelManager from "../../../HabboHotel/HotelManager";
import Connection from "../../Connection";
import Packet from "../Packet";
import PacketEvent from "../PacketEvent";

class UserCurrencyEvent implements PacketEvent {
    async execute(_connection: Connection, packet: Packet): Promise<void> {
        const credits = await packet.readInteger();
        const diamonds = await packet.readInteger();

        HotelManager.getUserManager().setData({ credits, diamonds });
    }
}

export default UserCurrencyEvent;
