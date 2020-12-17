import User from "@Database/entities/users/User";
import PacketComposer from "../PacketComposer";

class UserAvatarComposer extends PacketComposer {
    constructor(private user: User) {
        super('user_avatar');
    }

    async execute(): Promise<void> {
        this.writeString(this.user.look);
        this.writeString(this.user.gender);
        this.writeString(this.user.motto);
    }
}

export default UserAvatarComposer;
