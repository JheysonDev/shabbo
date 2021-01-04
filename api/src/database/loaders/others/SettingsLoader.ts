import LogsManager from "@Logs";
import SHabbo from "@SHabbo";

class SettingsLoader implements ILoader {
    async beforeRun(): Promise<boolean> {
        const settings = await SHabbo.getDatabase().getSettings().find({ take: 1 });
        return settings.length === 0;
    }

    async run(): Promise<void> {
        await SHabbo.getDatabase().getSettings().create({
            key: 'hotel_name',
            value: 'SHabbo',
        }).save();

        await SHabbo.getDatabase().getSettings().create({
            key: 'hotel_url',
            value: 'http://localhost:3000/',
        }).save();

        await SHabbo.getDatabase().getSettings().create({
            key: 'resources_url',
            value: 'http://localhost:5500/',
        }).save();

        await SHabbo.getDatabase().getSettings().create({
            key: 'images_url',
            value: '{@resources_url}images/',
        }).save();

        LogsManager.success('Default settings inserted.');
    }
}

export default SettingsLoader;
