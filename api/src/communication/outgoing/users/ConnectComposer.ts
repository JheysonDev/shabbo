import Connection from "@Communication/connection";
import User from "@Database/entities/users/User";
import PingComposer from "../handshake/PingComposer";
import PacketComposer from "../PacketComposer";

class ConnectComposer extends PacketComposer {
    constructor(private user: User, private connection: Connection) {
        super('connect');
    }

    async execute(): Promise<void> {
        try {
            this.connection.handleEvents();

            this.user.online = true;
            await this.user.save();

            await this.user.sendPacket(new PingComposer(1));

            console.log(`${this.user.username} is connected!`);

            this.writeBoolean(true);
        } catch (e) {
            this.writeBoolean(false);
        }
    }
}

export default ConnectComposer;
