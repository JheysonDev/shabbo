import Connection from "@Communication/Connection";
import LogsManager from "@Logs";
import SHabbo from "@SHabbo";
import Packet from "../Packet";
import PacketEvent from "../PacketEvent";

class DisconnectEvent implements PacketEvent {
    async execute(connection: Connection, packet: Packet): Promise<void> {
        const user = await connection.getUser();

        if (!user) {
            return;
        }

        if (user.getHabbo().inRoom()) {
            await user.getHabbo().getCurrentRoom().getUsersManager().removeHabbo(user.getHabbo());
        }

        if (SHabbo.getServer().getCommunication().removeConnection(connection)) {
            user.online = false;
            await user.save();

            LogsManager.status(`${user.username} is disconnected!`);
        }
    }
}

export default DisconnectEvent;
