import { Connection, ConnectionManager, getConnectionManager, Repository } from 'typeorm';

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
import DefaultValues from './DefaultValues';

class Database {
    private connections: ConnectionManager;
    private connection: Connection;

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
    }

    public getCatalogItems(): Repository<CatalogItem> {
        return this.connection.getRepository(CatalogItem);
    }

    public getCatalogPages(): Repository<CatalogPage> {
        return this.connection.getRepository(CatalogPage);
    }

    public getItems(): Repository<Item> {
        return this.connection.getRepository(Item);
    }

    public getNavigatorCategory(): Repository<NavigatorCategory> {
        return this.connection.getRepository(NavigatorCategory);
    }

    public getNavigatorRooms(): Repository<NavigatorRoom> {
        return this.connection.getRepository(NavigatorRoom);
    }

    public getRooms(): Repository<Room> {
        return this.connection.getRepository(Room);
    }

    public getRoomItems(): Repository<RoomItem> {
        return this.connection.getRepository(RoomItem);
    }

    public getRoomModels(): Repository<RoomModel> {
        return this.connection.getRepository(RoomModel);
    }

    public getUsers(): Repository<User> {
        return this.connection.getRepository(User);
    }

    public getSettings(): Repository<Setting> {
        return this.connection.getRepository(Setting);
    }

    public async run(): Promise<void> {
        await this.connection.connect();
        console.log('Connected to the database!');

        if (!(await this.getRoomModels().find({ take: 1 })).length) {
            await DefaultValues.roomModels();
        }
    }
}

export default Database;
