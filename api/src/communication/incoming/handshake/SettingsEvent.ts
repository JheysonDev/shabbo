import Connection from "@Communication/Connection";
import SettingsComposer from "@Communication/outgoing/handshake/SettingsComposer";
import PacketEvent from "../PacketEvent";

class SettingsEvent implements PacketEvent {
    async execute(connection: Connection): Promise<void> {
        await connection.sendPacket(new SettingsComposer());
    }
}

export default SettingsEvent;
