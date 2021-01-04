import LogsManager from "@Logs";
import SHabbo from "@SHabbo";

class ItemsLoader implements ILoader {
    async beforeRun(): Promise<boolean> {
        const items = await SHabbo.getDatabase().getItems().find({ take: 1 });
        return items.length === 0;
    }

    async run(): Promise<void> {
        // Mode
        await SHabbo.getDatabase().getItems().create({ id: 152, name: 'table_polyfon', width: 2, length: 2, height: 1 }).save();
        await SHabbo.getDatabase().getItems().create({ id: 25, name: 'stand_polyfon_z', height: 1 }).save();
        await SHabbo.getDatabase().getItems().create({ id: 31, name: 'table_polyfon_med', width: 2, length: 2, height: 1 }).save();
        await SHabbo.getDatabase().getItems().create({ id: 17, name: 'table_polyfon_small', width: 2, length: 2, height: 1 }).save();
        await SHabbo.getDatabase().getItems().create({ id: 18, name: 'chair_polyfon', height: 1, can_sit: true }).save();

        LogsManager.success('Default items inserted.');
    }
}

export default ItemsLoader;
