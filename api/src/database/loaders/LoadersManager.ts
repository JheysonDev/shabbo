// Navigator
import NavigatorCategoriesLoader from "./navigator/NavigatorCategoriesLoader";

// Others
import SettingsLoader from "./others/SettingsLoader";

// Rooms
import RoomsLoader from "./rooms/RoomsLoader";
import RoomModelsLoader from "./rooms/RoomModelsLoader";

// Users
import UsersLoader from "./users/UsersLoader";

class LoadersManager {
    private loaders: Map<string, ILoader>;

    constructor() {
        this.loaders = new Map();

        this._registerLoaders();
    }

    private _registerLoaders(): void {
        this._registerNavigator();
        this._registerOthers();
        this._registerRooms();
        this._registerUsers();
    }

    private _registerNavigator(): void {
        this.addLoader('navigator_categories', new NavigatorCategoriesLoader());
    }

    private _registerOthers(): void {
        this.addLoader('settings', new SettingsLoader());
    }

    private _registerRooms(): void {
        this.addLoader('rooms', new RoomsLoader());
        this.addLoader('room_models', new RoomModelsLoader());
    }

    private _registerUsers(): void {
        this.addLoader('users', new UsersLoader());
    }

    addLoader(name: string, loader: ILoader): boolean {
        if (this.loaders.has(name)) {
            return false;
        }

        this.loaders.set(name, loader);
        return this.loaders.has(name);
    }

    async runLoader(name: string): Promise<boolean> {
        const loader = this.loaders.get(name);
        if (loader) {
            await loader.run();
            return true;
        }

        return false;
    }
}

export default LoadersManager;
