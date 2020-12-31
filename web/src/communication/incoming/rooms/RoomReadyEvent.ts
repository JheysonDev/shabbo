import Connection from "@Communication/Connection";
import SHabbo from "@SHabbo";
import Packet from "../Packet";
import PacketEvent from "../PacketEvent";

class RoomReadyEvent implements PacketEvent {
    async execute(_connection: Connection, packet: Packet): Promise<void> {
        const id: number = await packet.readInteger();
        const floor: string = await packet.readString();

        SHabbo.getHotelManager().getRoomManager().setRoomData({ id, floor });
        SHabbo.getHotelManager().getRoomManager().generateRoom();
    }
}

export default RoomReadyEvent;
