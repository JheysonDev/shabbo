import { Avatar, Room, RoomCamera } from "@jankuss/shroom";
import MoveToComposer from "@Communication/outgoing/rooms/users/MoveToComposer";
import SHabbo from "@SHabbo";

class RoomManager {
    private data: IRoom;

    private room: Room | null;
    private camera: RoomCamera | null;

    private users_data: IRoomUser[];
    private users_in_room: [number, Avatar][];

    private user_clicked_id: number;

    constructor() {
        this.data = {
            id: 0,
            floor: '',
        };

        this.room = null;
        this.camera = null;

        this.users_data = [];
        this.users_in_room = [];

        this.user_clicked_id = 0;
    }

    isInRoom(): boolean {
        return this.data.id != 0;
    }

    setRoomData(data: Partial<IRoom>): void {
        this.data = { ...this.data, ...data };

        SHabbo.getHotelManager().getUIManager().getComponentsManager().forEach((component) => component.on('room_data_update'), true);
    }

    getRoom(): Room | null {
        return this.room;
    }

    addUser(user: IRoomUser): void {
        this.users_data.push(user);
    }

    removeUser(user_id: number): void {
        const avatar = this.getUser(user_id);
        if (!avatar || !this.room) {
            return;
        }

        this.room.removeRoomObject(avatar);
        this.users_data.splice(this.users_data.findIndex((u) => u.id === user_id), 1);
        this.users_in_room.splice(this.users_in_room.findIndex((u) => u[0] === user_id), 1);
    }

    generateRoom(): Room {
        if (this.camera) {
            SHabbo.getHotelManager().getUIManager().removeChildFromMain(this.camera);
        }

        this.room = Room.create(SHabbo.getHotelManager().getGame(), {
            tilemap: this.data.floor,
        });

        this.room.x = ~~(SHabbo.getHotelManager().getApplication().view.width / 2 - this.room.roomWidth / 2);
        this.room.y = ~~(SHabbo.getHotelManager().getApplication().view.height / 2 - this.room.roomHeight / 2);

        this.room.onTileClick = (position) => {
            SHabbo.getHotelManager().getConnection().sendPacket(new MoveToComposer(position.roomX, position.roomY));
        };

        this.camera = RoomCamera.forScreen(this.room);
        this.camera.zIndex = 0;

        SHabbo.getHotelManager().getUIManager().addChildToMain(this.camera);
        return this.room;
    }

    getUser(user_id: number): Avatar | null {
        const user = this.users_in_room.find((u) => u[0] === user_id);
        return user ? user[1] : null;
    }

    hasUser(user: IRoomUser): boolean {
        return this.users_in_room.find((u) => u[0] === user.id) != null;
    }

    generateUsers(): void {
        if (this.users_data.length && this.room) {
            for (const user of this.users_data) {
                if (this.hasUser(user)) {
                    continue;
                }

                const avatar = new Avatar({
                    look: user.look,

                    roomX: user.x,
                    roomY: user.y,
                    roomZ: user.z,
                    direction: user.rotation,
                });

                avatar.onClick = () => {
                    const avatarClickOptions = SHabbo.getHotelManager().getUIManager().getComponentsManager().getComponent('avatar_click_options');
                    if (avatarClickOptions) {
                        if (!avatarClickOptions.isActive()) {
                            avatarClickOptions.build();
                        }

                        if (this.user_clicked_id === user.id && avatarClickOptions.isActive()) {
                            this.user_clicked_id = 0;
                            avatarClickOptions.dispose();
                        } else {
                            this.user_clicked_id = user.id;
                            SHabbo.getHotelManager().getUIManager().getComponentsManager().forEach((component) => component.on('user_room_clicked', avatar, user),true);
                        }
                    }
                };

                this.users_in_room.push([user.id, avatar]);
                this.room.addRoomObject(avatar);
            }
        }
    }
}

export default RoomManager;
