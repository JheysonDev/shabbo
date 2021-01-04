import LogsManager from "@Logs";
import SHabbo from "@SHabbo";

class NavigatorCategoriesLoader implements ILoader {
    async beforeRun(): Promise<boolean> {
        const navigator_categories = await SHabbo.getDatabase().getNavigatorCategory().find({ take: 1 });
        return navigator_categories.length === 0;
    }

    async run(): Promise<void> {
        await SHabbo.getDatabase().getNavigatorCategory().create({
            id: 1,
            name: 'Street',
        }).save();

        LogsManager.success('Default navigator categories inserted.');
    }
}

export default NavigatorCategoriesLoader;
