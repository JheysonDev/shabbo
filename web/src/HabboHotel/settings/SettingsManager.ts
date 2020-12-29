import SettingsComposer from "../../communication/outgoing/handshake/SettingsComposer";
import HotelManager from "../HotelManager";
import Setting from "./Setting";

class SettingsManager {
    private settings: Setting[];

    constructor() {
        this.settings = [];
    }

    run(): void {
        HotelManager.getConnection().sendPacket(new SettingsComposer());
    }

    getSetting(key: string): Setting | null {
        return this.settings.find((setting) => setting.getKey() === key) || null;
    }

    hasSetting(key: string): boolean {
        return this.settings.find((setting) => setting.getKey() === key) != null;
    }

    addSetting(key: string, value: string): Setting | null {
        if (this.hasSetting(key)) {
            return null;
        }

        this.settings.push(new Setting(key, value));

        return this.getSetting(key);
    }

    removeSetting(key: string): Setting | null {
        if (!this.hasSetting(key)) {
            return null;
        }

        const setting = this.getSetting(key);

        this.settings.splice(this.settings.findIndex((setting) => setting.getKey() === key), 1);

        return setting;
    }
}

export default SettingsManager;
