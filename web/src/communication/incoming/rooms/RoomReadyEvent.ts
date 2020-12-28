import Connection from "../../Connection";
import Packet from "../Packet";
import PacketEvent from "../PacketEvent";
import HotelManager from "../../../HabboHotel/HotelManager";

class RoomReadyEvent implements PacketEvent {
    async execute(connection: Connection, packet: Packet): Promise<void> {
        const id: number = await packet.readInteger();
        const floor: string = await packet.readString();

        HotelManager.getRoomManager().setRoomData({ id, floor });
        HotelManager.getRoomManager().generateRoom();
    }
}

export default RoomReadyEvent;
