import { setUserData } from "../../../data/actions/client/userActions";
import clientStore from "../../../data/stores/clientStore";
import Connection from "../../Connection";
import Packet from "../Packet";
import PacketEvent from "../PacketEvent";

class UserCurrencyEvent implements PacketEvent {
    async execute(_connection: Connection, packet: Packet): Promise<void> {
        const credits = await packet.readInteger();
        const diamonds = await packet.readInteger();

        clientStore.dispatch(setUserData({ credits, diamonds }));
    }
}

export default UserCurrencyEvent;
