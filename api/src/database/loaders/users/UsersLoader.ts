import LogsManager from "@Logs";
import SHabbo from "@SHabbo";

class UsersLoader implements ILoader {
    async run(): Promise<void> {
        await SHabbo.getDatabase().getUsers().create({
            id: 1,
            username: 'SHabbo',
        }).save();

        LogsManager.success('Inserted 1 user.');
    }
}

export default UsersLoader;
