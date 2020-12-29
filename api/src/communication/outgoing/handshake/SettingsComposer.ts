import SHabbo from "@SHabbo";
import PacketComposer from "../PacketComposer";

class SettingsComposer extends PacketComposer {
    constructor() {
        super('settings');

        const settings = Object.entries(SHabbo.getHotel().getSettings());

        this.writeInteger(settings.length);

        if (settings.length) {
            for (const [key, value] of settings) {
                this.writeString(key);
                this.writeString(value);
            }
        }
    }
}

export default SettingsComposer;
