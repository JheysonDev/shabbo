import Connection from "@Communication/Connection";
import SHabbo from "@SHabbo";
import Packet from "../Packet";
import PacketEvent from "../PacketEvent";

class NavigatorRoomModelsEvent implements PacketEvent {
    async execute(_connection: Connection, packet: Packet): Promise<void> {
        const size = await packet.readInteger();

        if (size > 0) {
            for (let i = 0; i < size; i++) {
                const id = await packet.readInteger();
                const name = await packet.readString();
                const cost_credits = await packet.readInteger();

                SHabbo.getHotelManager().getNavigatorManager().addRoomModel({ id, name, cost_credits });
            }
        }
    }
}

export default NavigatorRoomModelsEvent;
