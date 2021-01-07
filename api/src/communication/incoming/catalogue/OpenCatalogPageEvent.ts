import Connection from "@Communication/Connection";
import CatalogPagesComposer from "@Communication/outgoing/catalogue/CatalogPagesComposer";
import SHabbo from "@SHabbo";
import Packet from "../Packet";
import PacketEvent from "../PacketEvent";

class OpenCataloPageEvent implements PacketEvent {
    async execute(connection: Connection, packet: Packet): Promise<void> {
        const page_id = await packet.readInteger();

        const pages = await SHabbo.getHotel().getCatalogueManager().loadPagesByParentID(page_id);
        await connection.sendPacket(new CatalogPagesComposer(pages));
    }
}

export default OpenCataloPageEvent;
