import Item from "@Database/entities/items/Item";
import LogsManager from "@Logs";
import SHabbo from "@SHabbo";
import { DeepPartial } from "typeorm";
import * as ItemsData from "./ItemsData.json";

type ItemPartial = DeepPartial<Item>;

class ItemsLoader implements ILoader {
    async beforeRun(): Promise<boolean> {
        const items = await SHabbo.getDatabase().getItems().find({ take: 1 });
        return items.length === 0;
    }

    async run(): Promise<void> {
        const items: ItemPartial[] = ItemsData;

        for await (const item of items) {
            await SHabbo.getDatabase().getItems().create(item).save();
        }

        LogsManager.success('Default items inserted.');
    }
}

export default ItemsLoader;
