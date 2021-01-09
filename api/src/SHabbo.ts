import HotelManager from '@HabboHotel/HotelManager';
import Database from '@Database/Database';
import Server from '@Server/Server';

class SHabbo {
  private static database: Database;
  private static server: Server;

  private static hotel: HotelManager;

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

  public static getHotel(): HotelManager {
    if (this.hotel == null) {
      this.hotel = new HotelManager();
    }

    return this.hotel;
  }

  async run(): Promise<void> {
    if (process.env.NODE_ENV !== 'production') {
      const dotenv = await import('dotenv');
      dotenv.config();
    }

    // Initialize the Database connection.
    await SHabbo.getDatabase().run();

    // Initialize the Server.
    await SHabbo.getServer().run();

    // Initialize the Hotel.
    await SHabbo.getHotel().run();

    // Listen Server.
    SHabbo.getServer().listen();
  }

  static sleep(miliseconds: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, miliseconds));
  }
}

export default SHabbo;
