import Connection from "../../Connection";
import HotelManager from "../../../HabboHotel/HotelManager";
import Packet from "../Packet";
import PacketEvent from "../PacketEvent";

class SettingsEvent implements PacketEvent {
    async execute(connection: Connection, packet: Packet): Promise<void> {
        const length = await packet.readInteger();

        if (length > 0) {
            for await (const _ of Array.from({ length })) {
                HotelManager.getSettingsManager().addSetting(await packet.readString(), await packet.readString());
            }
        }
    }
}

export default SettingsEvent;
