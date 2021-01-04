import LogsManager from "@Logs";
import SHabbo from "@SHabbo";

class RoomsLoader implements ILoader {
    async beforeRun(): Promise<boolean> {
        const rooms = await SHabbo.getDatabase().getRooms().find({ take: 1 });
        return rooms.length === 0;
    }

    async run(): Promise<void> {
        const modelA = await SHabbo.getDatabase().getRoomModels().findOne(1);
        const categoryOne = await SHabbo.getDatabase().getNavigatorCategory().findOne(1);
        const userOne = await SHabbo.getDatabase().getUsers().findOne(1);

        if (modelA && categoryOne) {
            await SHabbo.getDatabase().getRooms().create({
                id: 1,
                name: 'Lobby',
                model: modelA,
                category: categoryOne,
                owner: userOne,
            }).save();

            LogsManager.success('Default room inserted.');
        }
    }
}

export default RoomsLoader;
