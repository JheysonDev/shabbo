import Connection from "@Communication/Connection";
import CatalogueManager from "@HabboHotel/catalogue/CatalogueManager";
import SHabbo from "@SHabbo";
import Packet from "../Packet";
import PacketEvent from "../PacketEvent";

class CatalogPagesEvent implements PacketEvent {
    async execute(connection: Connection, packet: Packet): Promise<void> {
        const size = await packet.readInteger();

        if (size > 0) {
            for (let i = 0; i < size; i++) {
                SHabbo.getHotelManager().getCatalogueManager().addPage({
                    id: await packet.readInteger(),
                    name: await packet.readString(),
                    type: CatalogueManager.toCatalogPageType(await packet.readString()),
                    parent: await packet.readInteger(),
                    order: await packet.readInteger(),
                    icon: await packet.readInteger(),
                    children: await packet.readInteger(),
                });
            }
        }
    }
}

export default CatalogPagesEvent;
