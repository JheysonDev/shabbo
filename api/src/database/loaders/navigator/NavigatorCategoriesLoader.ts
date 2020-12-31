import LogsManager from "@Logs";
import SHabbo from "@SHabbo";

class NavigatorCategoriesLoader implements ILoader {
    async run(): Promise<void> {
        await SHabbo.getDatabase().getNavigatorCategory().create({
            id: 1,
            name: 'Street',
        }).save();

        LogsManager.success('Inserted 1 navigator category.');
    }
}

export default NavigatorCategoriesLoader;
