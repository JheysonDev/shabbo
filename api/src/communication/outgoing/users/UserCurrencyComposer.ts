import User from "@Database/entities/users/User";
import PacketComposer from "../PacketComposer";

class UserCurrencyComposer extends PacketComposer {
    constructor(private user: User) {
        super('user_currency');
    }

    async execute(): Promise<void> {
        this.writeInteger(this.user.credits);
        this.writeInteger(this.user.diamonds);
    }
}

export default UserCurrencyComposer;
