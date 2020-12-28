import PacketComposer from "@Communication/outgoing/PacketComposer";
import Habbo from "@HabboHotel/users/Habbo";

class UserChangeComposer extends PacketComposer {
    constructor(habbo: Habbo) {
        super('user_change');

        this.writeInteger(habbo.getUser().id);
        this.writeString(habbo.getUser().look);
        this.writeString(habbo.getUser().motto);
    }
}

export default UserChangeComposer;
