import Connection from "communication/Connection";
import HotelManager from "../../../../HabboHotel/HotelManager";
import Packet from "../../Packet";
import PacketEvent from "../../PacketEvent";

class RoomUsersEvent implements PacketEvent {
    async execute(connection: Connection, packet: Packet): Promise<void> {
        const size: number = await packet.readInteger();

        if (size > 0) {
            const users: IRoomUser[] = [];

            for (let i = 0; i < size; i++) {
                const id: number = await packet.readInteger();
                const username: string = await packet.readString();
                const look: string = await packet.readString();
                const motto: string = await packet.readString();

                const x: number = await packet.readInteger();
                const y: number = await packet.readInteger();
                const z: number = await packet.readInteger();
                const rotation: number = await packet.readInteger();

                HotelManager.getRoomManager().addUser({ id, username, look, motto, x, y, z, rotation });
            }

            HotelManager.getRoomManager().generateUsers();
        }
    }
}

export default RoomUsersEvent;
