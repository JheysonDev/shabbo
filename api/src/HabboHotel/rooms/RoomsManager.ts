import SHabbo from "@SHabbo";
import HabboRoom from "./HabboRoom";

class RoomsManager {
    private active_rooms: HabboRoom[];

    constructor() {
        this.active_rooms = [];
    }

    getRoomByID(room_id: number): HabboRoom {
        return this.active_rooms.find((client_room) => client_room.getRoom().id === room_id);
    }

    async loadRoomByID(room_id: number): Promise<HabboRoom> {
        const active_room = this.getRoomByID(room_id);
        if (active_room != null) {
            return active_room;
        }

        const room = await SHabbo.getDatabase().getRooms().findOne(room_id, { relations: ['model', 'category', 'owner'] });
        if (!room) {
            throw new Error(`The room #${room_id} does not exist.`);
        }

        const client_room = new HabboRoom(room);
        this.active_rooms.push(client_room);

        return client_room;
    }
}

export default RoomsManager;
