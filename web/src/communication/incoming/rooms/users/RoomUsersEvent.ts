import Connection from "@Communication/Connection";
import Packet from "@Communication/incoming/Packet";
import PacketEvent from "@Communication/incoming/PacketEvent";
import SHabbo from "@SHabbo";

class RoomUsersEvent implements PacketEvent {
    async execute(_connection: Connection, packet: Packet): Promise<void> {
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

                SHabbo.getHotelManager().getRoomManager().addUser({ id, username, look, motto, x, y, z, rotation });
            }

            SHabbo.getHotelManager().getRoomManager().generateUsers();
        }
    }
}

export default RoomUsersEvent;
