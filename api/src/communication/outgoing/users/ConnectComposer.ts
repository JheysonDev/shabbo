import Connection from "@Communication/connection";
import User from "@Database/entities/users/User";
import PingComposer from "../handshake/PingComposer";
import PacketComposer from "../PacketComposer";
import UserAvatarComposer from "./UserAvatarComposer";
import UserCurrencyComposer from "./UserCurrencyComposer";
import UserInfoComposer from "./UserInfoComposer";

class ConnectComposer extends PacketComposer {
    constructor(private user: User, private connection: Connection) {
        super('new_connection');
    }

    async execute(): Promise<void> {
        this.connection.handleEvents();

        try {
            this.user.online = true;
            await this.user.save();

            await this.user.getHabbo().sendPacket(new PingComposer(1));

            await this.user.getHabbo().sendPacket(new UserAvatarComposer(this.user));
            await this.user.getHabbo().sendPacket(new UserCurrencyComposer(this.user));
            await this.user.getHabbo().sendPacket(new UserInfoComposer(this.user));

            if (this.user.last_room) {
                this.user.getHabbo().goToRoom(this.user.last_room.id);
            }

            console.log(`${this.user.username} is connected!`);

            this.writeBoolean(true);
        } catch (e) {
            this.writeBoolean(false);
        }
    }
}

export default ConnectComposer;
