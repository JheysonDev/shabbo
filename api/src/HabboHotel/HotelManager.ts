import LogsManager from "@Logs";
import SHabbo from "@SHabbo";
import RoomsManager from "./rooms/RoomsManager";

class HotelManager {
    private settings: Settings;

    private roomsManager: RoomsManager;

    constructor() {
        this.settings = {};

        this.roomsManager = new RoomsManager();
    }

    async run(): Promise<void> {
        this.settings = {};

        const settings = await SHabbo.getDatabase().getSettings().find();
        if (settings.length) {
            for (const setting of settings) {
                this.settings[setting.key] = setting.value;
            }

            for (const [key, value] of Object.entries(this.settings)) {
                if (!value.includes('{@resources_url}')) {
                    continue;
                }

                this.settings[key] = value.replace(/{@resources_url}/i, this.settings.resources_url);
            }

            LogsManager.info(`Loaded ${settings.length} settings.`);
        }
    }

    getSettings(): Settings {
        return this.settings;
    }

    getSetting(key: string, default_value: string = ''): string {
        return this.settings[key] || default_value;
    }

    getRoomsManager(): RoomsManager {
        return this.roomsManager;
    }
}

export default HotelManager;
