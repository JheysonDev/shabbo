import Connection from "@Communication/Connection";
import SHabbo from "@SHabbo";
import Packet from "../Packet";
import PacketEvent from "../PacketEvent";

class ConnectEvent implements PacketEvent {
    async execute(_connection: Connection, packet: Packet): Promise<void> {
        SHabbo.getHotelManager().getUserManager().setConnected(await packet.readBoolean());

        const header = SHabbo.getHotelManager().getUIManager().getComponentsManager().getComponent('header');
        if (header && !header.isActive()) {
            header.build()
        }

        const footer = SHabbo.getHotelManager().getUIManager().getComponentsManager().getComponent('footer');
        if (footer && !footer.isActive()) {
            footer.build();
        }
    }
}

export default ConnectEvent;
