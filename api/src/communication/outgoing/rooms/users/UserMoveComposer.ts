import PacketComposer from "@Communication/outgoing/PacketComposer";
import Habbo from "@HabboHotel/users/Habbo";

class UserMoveComposer extends PacketComposer {
    constructor(habbo: Habbo) {
        super('user_move');

        this.writeInteger(habbo.getUser().id);
        this.writeInteger(habbo.getCoords().x);
        this.writeInteger(habbo.getCoords().y);
        this.writeInteger(habbo.getCoords().z);
        this.writeInteger(habbo.getCoords().rotation);
    }
}

export default UserMoveComposer;
