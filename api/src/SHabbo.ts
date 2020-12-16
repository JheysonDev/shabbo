import Database from '@Database/Database';
import Server from '@Server/Server';

class SHabbo {
    private static database: Database;
    private static server: Server;

    public static getDatabase(): Database {
        if (this.database == null) {
            this.database = new Database();
        }

        return this.database;
    }

    public static getServer(): Server {
        if (this.server == null) {
            this.server = new Server();
        }

        return this.server;
    }

    public async run(): Promise<void> {
        if (process.env.NODE_ENV !== 'production') {
            const dotenv = await import('dotenv');
            dotenv.config();
        }

        // Initialize the Database connection.
        await SHabbo.getDatabase().run();

        // Initialize the Server.
        await SHabbo.getServer().run();

        // Listen Server.
        SHabbo.getServer().listen();
    }
}

export default SHabbo;
