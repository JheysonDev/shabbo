import Connection from "../../../Connection";
import Packet from "../../Packet";
import PacketEvent from "../../PacketEvent";
import HotelManager from "../../../../HabboHotel/HotelManager";

class UserRemoveEvent implements PacketEvent {
    async execute(connection: Connection, packet: Packet): Promise<void> {
        HotelManager.getRoomManager().removeUser(await packet.readInteger());
    }
}

export default UserRemoveEvent;
