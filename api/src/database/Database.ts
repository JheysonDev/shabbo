import { Connection, ConnectionManager, getConnectionManager, Repository } from 'typeorm';
import LoadersManager from './loaders/LoadersManager';
import LogsManager from '@Logs';

// Catalogue
import CatalogItem from './entities/catalogue/CatalogItem';
import CatalogPage from './entities/catalogue/CatalogPage';

// Items
import Item from './entities/items/Item';

// Navigator
import NavigatorCategory from './entities/navigator/NavigatorCategory';
import NavigatorRoom from './entities/navigator/NavigatorRoom';

// Rooms
import Room from './entities/rooms/Room';
import RoomItem from './entities/rooms/RoomItem';
import RoomModel from './entities/rooms/RoomModel';

// Users
import User from './entities/users/User';

// Other
import Setting from './entities/Setting';

class Database {
    private connections: ConnectionManager;
    private connection: Connection;

    private loaders: LoadersManager

    constructor() {
        this.connections = getConnectionManager();
        this.connection = this.connections.create({
            type: 'mysql',
            host: process.env.DB_HOST || 'localhost',
            port: Number(process.env.DB_PORT || '3306'),
            username: process.env.DB_USER || 'root',
            password: process.env.DB_PASS || '',
            database: process.env.DB_NAME || 'shabbo',
            entities: [
                // Catalogue
                CatalogItem,
                CatalogPage,

                // Items
                Item,

                // Navigator
                NavigatorCategory,
                NavigatorRoom,

                // Rooms
                Room,
                RoomItem,
                RoomModel,

                // Users
                User,

                // Others
                Setting,
            ],
            synchronize: true,
        });

        this.loaders = new LoadersManager();
    }

    getLoadersManager(): LoadersManager {
        return this.loaders;
    }

    getCatalogItems(): Repository<CatalogItem> {
        return this.connection.getRepository(CatalogItem);
    }

    getCatalogPages(): Repository<CatalogPage> {
        return this.connection.getRepository(CatalogPage);
    }

    getItems(): Repository<Item> {
        return this.connection.getRepository(Item);
    }

    getNavigatorCategory(): Repository<NavigatorCategory> {
        return this.connection.getRepository(NavigatorCategory);
    }

    getNavigatorRooms(): Repository<NavigatorRoom> {
        return this.connection.getRepository(NavigatorRoom);
    }

    getRooms(): Repository<Room> {
        return this.connection.getRepository(Room);
    }

    getRoomItems(): Repository<RoomItem> {
        return this.connection.getRepository(RoomItem);
    }

    getRoomModels(): Repository<RoomModel> {
        return this.connection.getRepository(RoomModel);
    }

    getUsers(): Repository<User> {
        return this.connection.getRepository(User);
    }

    getSettings(): Repository<Setting> {
        return this.connection.getRepository(Setting);
    }

    async run(): Promise<void> {
        await this.connection.connect();
        LogsManager.success('Connected to the database!');

        await this.loaders.runAll();
    }
}

export default Database;
