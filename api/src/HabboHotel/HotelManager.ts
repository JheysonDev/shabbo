import LogsManager from "@Logs";
import SHabbo from "@SHabbo";
import CatalogueManager from "./catalogue/CatalogueManager";
import ItemsManager from "./items/ItemsManager";
import RoomsManager from "./rooms/RoomsManager";

class HotelManager {
    private settings: Settings;

    private catalogue: CatalogueManager;
    private items: ItemsManager;
    private rooms: RoomsManager;

    constructor() {
        this.settings = {};

        this.catalogue = new CatalogueManager();
        this.items = new ItemsManager();
        this.rooms = new RoomsManager();
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

    getCatalogueManager(): CatalogueManager {
        return this.catalogue;
    }

    getItemsManager(): ItemsManager {
        return this.items;
    }

    getRoomsManager(): RoomsManager {
        return this.rooms;
    }
}

export default HotelManager;
