import LogsManager from "@Logs";
import SHabbo from "@SHabbo";

class UsersLoader implements ILoader {
    async beforeRun(): Promise<boolean> {
        const users = await SHabbo.getDatabase().getUsers().find({ take: 1 });
        return users.length === 0;
    }

    async run(): Promise<void> {
        await SHabbo.getDatabase().getUsers().create({
            id: 1,
            username: 'SHabbo',
        }).save();

        LogsManager.success('Default users inserted.');
    }
}

export default UsersLoader;
