import Connection from "communication/Connection";
import Packet from "../Packet";
import PacketEvent from "../PacketEvent";

class NavigatorRoomModelsEvent implements PacketEvent {
    async execute(connection: Connection, packet: Packet): Promise<void> {
        //clientStore.dispatch(setNavigatorRooms([]));

        const size = await packet.readInteger();

        if (size > 0) {
            const navigator_rooms: INavigatorRoom[] = [];

            for (let i = 0; i < size; i++) {
                const id = await packet.readInteger();
                const name = await packet.readString();
                const cost_credits = await packet.readInteger();

                navigator_rooms.push({ id, name, cost_credits });
            }

            //clientStore.dispatch(setNavigatorRooms(navigator_rooms));
        }
    }
}

export default NavigatorRoomModelsEvent;
