import User from "@Database/entities/users/User";
import PacketComposer from "../PacketComposer";

class UserInfoComposer extends PacketComposer {
    constructor(private user: User) {
        super('user_info');
    }

    async execute(): Promise<void> {
        this.writeInteger(this.user.id);
        this.writeString(this.user.username);
    }
}

export default UserInfoComposer;
