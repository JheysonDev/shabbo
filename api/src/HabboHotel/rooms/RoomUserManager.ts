import RoomUsersComposer from "@Communication/outgoing/rooms/users/RoomUsersComposer";
import UserRemoveComposer from "@Communication/outgoing/rooms/users/UserRemoveComposer";
import Habbo from "@HabboHotel/users/Habbo";
import HabboRoom from "./HabboRoom";

class RoomUserManager {
    private habbos: Habbo[];

    constructor(private habbo_room: HabboRoom) {
        this.habbos = [];
    }

    getHabbos(): Habbo[] {
        return this.habbos;
    }

    hasHabbo(habbo: Habbo): boolean {
        return this.habbos.find((h) => h.getUser().id === habbo.getUser().id) != undefined;
    }

    async addHabbo(habbo: Habbo): Promise<void> {
        if (this.hasHabbo(habbo)) {
            throw new Error(`The room #${this.habbo_room.getRoom().id} already has the user #${habbo.getUser().id}.`);
        }

        await this.habbo_room.sendPacket(new RoomUsersComposer([habbo]));

        this.habbos.push(habbo);

        await habbo.sendPacket(new RoomUsersComposer(this.habbos));
    }

    async removeHabbo(habbo: Habbo): Promise<void> {
        if (!this.hasHabbo(habbo)) {
            throw new Error(`The room #${this.habbo_room.getRoom().id} does not have the user #${habbo.getUser().id}.`);
        }

        this.habbos.splice(this.habbos.findIndex((h) => h.getUser().id === habbo.getUser().id), 1);

        await this.habbo_room.sendPacket(new UserRemoveComposer(habbo.getUser().id));
    }
}

export default RoomUserManager;
