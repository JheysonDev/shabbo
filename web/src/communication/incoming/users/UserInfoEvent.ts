import { setUserData } from "../../../data/actions/client/userActions";
import clientStore from "../../../data/stores/clientStore";
import Connection from "../../Connection";
import Packet from "../Packet";
import PacketEvent from "../PacketEvent";

class UserInfoEvent implements PacketEvent {
    async execute(_connection: Connection, packet: Packet): Promise<void> {
        const userID = await packet.readInteger();
        const username = await packet.readString();

        clientStore.dispatch(setUserData({ id: userID, username }));
    }
}

export default UserInfoEvent;
