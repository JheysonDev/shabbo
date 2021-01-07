import Connection from "@Communication/Connection";
import SHabbo from "@SHabbo";
import Packet from "../Packet";
import PacketEvent from "../PacketEvent";

class ConnectEvent implements PacketEvent {
    async execute(_connection: Connection, packet: Packet): Promise<void> {
        SHabbo.getHotelManager().getUserManager().setConnected(await packet.readBoolean());

        await SHabbo.getHotelManager().getUIManager().getComponentsManager().build('header');
        await SHabbo.getHotelManager().getUIManager().getComponentsManager().build('footer');
    }
}

export default ConnectEvent;
