import Connection from "../../../Connection";
import Packet from "../../Packet";
import PacketEvent from "../../PacketEvent";
import HotelManager from "../../../../HabboHotel/HotelManager";

class UserMoveEvent implements PacketEvent {
    async execute(connection: Connection, packet: Packet): Promise<void> {
        const user_id = await packet.readInteger();
        const x = await packet.readInteger();
        const y = await packet.readInteger();
        const z = await packet.readInteger();
        const rotation = await packet.readInteger();

        const avatar = HotelManager.getRoomManager().getUser(user_id);
        if (avatar) {
            avatar.walk(x, y, z, { direction: rotation });
        }
    }
}

export default UserMoveEvent;
