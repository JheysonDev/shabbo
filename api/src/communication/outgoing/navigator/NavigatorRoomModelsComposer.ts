import SHabbo from "@SHabbo";
import PacketComposer from "../PacketComposer";

class NavigatorRoomModelsComposer extends PacketComposer {
    constructor() {
        super('navigator_room_models');
    }

    async execute(): Promise<void> {
        const models = (
            await SHabbo
                .getDatabase()
                .getNavigatorRooms()
                .find()
        ).sort((a, b) => a.order - b.order);

        this.writeInteger(models.length);

        if (models.length) {
            for (const model of models) {
                this.writeInteger(model.id);
                this.writeString(model.name);
                this.writeInteger(model.cost_credits);
            }
        }
    }
}

export default NavigatorRoomModelsComposer;
