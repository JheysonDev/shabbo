import HabboRoom from "../rooms/HabboRoom";
import PacketComposer from "@Communication/outgoing/PacketComposer";
import RoomReadyComposer from "@Communication/outgoing/rooms/RoomReadyComposer";
import User from "@Database/entities/users/User";
import SHabbo from "@SHabbo";
import UserMoveComposer from "@Communication/outgoing/rooms/users/UserMoveComposer";

class Habbo {
    private current_room: HabboRoom | null;

    private coords: Point;

    private path: Path;
    private pathStep: number;

    constructor(private user: User) {
        this.current_room = null;

        this.coords = { x: 0, y: 0, z: 0, rotation: 0 };

        this.path = [];
        this.pathStep = 0;
    }

    getUser(): User {
        return this.user;
    }

    inRoom(): boolean {
        return this.current_room != null;
    }

    getCurrentRoom(): HabboRoom {
        return this.current_room;
    }

    getCoords(): Point {
        return this.coords;
    }

    async sendPacket(packet: PacketComposer): Promise<boolean> {
        const connection = SHabbo.getServer().getCommunication().getConnection(this.getUser().id);

        if (!connection) {
            throw new Error('No connection for user.');
        }

        return await connection.sendPacket(packet);
    }

    async goToRoom(room_id: number): Promise<void> {
        const room: HabboRoom = await SHabbo.getHotel().getRoomsManager().loadRoomByID(room_id);
        if (!room) {
            throw new Error(`Cannot load the room #${room_id}.`);
        }

        if (this.inRoom()) {
            this.current_room.getUsersManager().removeHabbo(this);
        }

        this.current_room = room;
        this.coords = room.getRoom().model.getDoorPoint();

        await this.sendPacket(new RoomReadyComposer(room_id, room.getRoom().model.floor));
        await room.getUsersManager().addHabbo(this);
    }

    calculateRotation(x1: number, y1: number, x2: number, y2: number, moonwalk: boolean = false): number {
        let rotation: number = 0;

        if (x1 > x2 && y1 > y2) {
            rotation = 7;
        } else if (x1 < x2 && y1 < y2) {
            rotation = 3;
        } else if (x1 > x2 && y1 < y2) {
            rotation = 5;
        } else if (x1 < x2 && y1 > y2) {
            rotation = 1;
        } else if (x1 > x2) {
            rotation = 6;
        } else if (x1 < x2) {
            rotation = 2;
        } else if (y1 < y2) {
            rotation = 4;
        }

        if (moonwalk) {
            if (rotation > 3) {
                rotation -= 4;
            } else {
                rotation += 4;
            }
        }

        return rotation;
    }

    async moveTo(x: number, y: number): Promise<void> {
        if (!this.inRoom()) {
            return;
        }

        if (this.current_room.getGameMap().tileHasUser(x, y)) {
            return;
        }

        if (this.path.length) {
            this.path = [];
            this.pathStep = 0;
        }

        this.path = this.current_room.getGameMap().getPathfinding().findPath(this.coords.x, this.coords.y, x, y, this.current_room.getGameMap().getGrid());
        this.pathStep = 1;

        while(this.pathStep < this.path.length) {
            const [toX, toY] = this.path[this.pathStep];

            this.coords.rotation = this.calculateRotation(this.coords.x, this.coords.y, toX, toY);
            this.coords.x = toX;
            this.coords.y = toY;
            this.coords.z = this.current_room.getGameMap().getTileHeight(toX, toY);

            await this.current_room.sendPacket(new UserMoveComposer(this));
            await SHabbo.sleep(25);

            this.pathStep++;
        }
    }
}

export default Habbo;
