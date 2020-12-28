import PacketComposer from "@Communication/outgoing/PacketComposer";

class UserRemoveComposer extends PacketComposer {
    constructor(user_id: number) {
        super('user_remove');

        this.writeInteger(user_id);
    }
}

export default UserRemoveComposer;
