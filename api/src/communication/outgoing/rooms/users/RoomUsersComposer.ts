import Habbo from "@HabboHotel/users/Habbo";
import PacketComposer from "../../PacketComposer";

class RoomUsersComposer extends PacketComposer {
    constructor(private habbos: Habbo[]) {
        super('room_users');
    }

    async execute(): Promise<void> {
        this.writeInteger(this.habbos.length);

        if (this.habbos.length) {
            for (const habbo of this.habbos) {
                this.writeInteger(habbo.getUser().id);
                this.writeString(habbo.getUser().username);
                this.writeString(habbo.getUser().look);
                this.writeString(habbo.getUser().motto);

                this.writeInteger(habbo.getCoords().x);
                this.writeInteger(habbo.getCoords().y);
                this.writeInteger(habbo.getCoords().z);
                this.writeInteger(habbo.getCoords().rotation);
            }
        }
    }
}

export default RoomUsersComposer;
