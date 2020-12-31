import PacketComposer from "@Communication/outgoing/PacketComposer";
import Room from "@Database/entities/rooms/Room";
import GameMap from "./GameMap";
import RoomUserManager from "./RoomUserManager";

class HabboRoom {
    private gamemap: GameMap;
    private users: RoomUserManager;

    constructor(private room: Room) {
        this.gamemap = new GameMap(this);
        this.users = new RoomUserManager(this);
    }

    getRoom(): Room {
        return this.room;
    }

    getGameMap(): GameMap {
        return this.gamemap;
    }

    getUsersManager(): RoomUserManager {
        return this.users;
    }

    async sendPacket(packet: PacketComposer): Promise<boolean> {
        let result: boolean = false;

        for await (const user of this.users.getHabbos()) {
            result = await user.sendPacket(packet);
        }

        return result;
    }
}

export default HabboRoom;
