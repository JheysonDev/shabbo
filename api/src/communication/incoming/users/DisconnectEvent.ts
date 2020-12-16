import Connection from "@Communication/Connection";
import SHabbo from "@SHabbo";
import Packet from "../packet";
import PacketEvent from "../PacketEvent";

class DisconnectEvent implements PacketEvent {
    async execute(connection: Connection, packet: Packet): Promise<void> {
        const user = await connection.getUser();

        if (!user) {
            return;
        }

        if (SHabbo.getServer().getCommunication().removeConnection(connection)) {
            user.online = false;
            await user.save();

            console.log(`${user.username} is disconnected!`);
        }
    }
}

export default DisconnectEvent;
