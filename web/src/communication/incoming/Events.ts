import PacketEvent from "./PacketEvent";

// Handshake
import PingEvent from "./handshake/PingEvent";

// Navigator
import NavigatorRoomModelsEvent from "./navigator/NavigatorRoomModelsEvent";

// Rooms
import RoomReadyEvent from "./rooms/RoomReadyEvent";
import RoomUsersEvent from "./rooms/users/RoomUsersEvent";
import UserMoveEvent from "./rooms/users/UserMoveEvent";
import UserRemoveEvent from "./rooms/users/UserRemoveEvent";

// Users
import ConnectEvent from "./users/ConnectEvent";
import UserAvatarEvent from "./users/UserAvatarEvent";
import UserCurrencyEvent from "./users/UserCurrencyEvent";
import UserInfoEvent from "./users/UserInfoEvent";

class Events {
    private events: Map<string, PacketEvent>;

    constructor() {
        this.events = new Map();

        this._registerEvents();
    }

    private _registerEvents() {
        this._registerHandshake();
        this._registerNavigator();
        this._registerRooms();
        this._registerUsers();
    }

    private _registerHandshake() {
        this.addEvent('ping', new PingEvent());
    }

    private _registerNavigator() {
        this.addEvent('navigator_room_models', new NavigatorRoomModelsEvent());
    }

    private _registerRooms() {
        this.addEvent('room_ready', new RoomReadyEvent());

        this.addEvent('room_users', new RoomUsersEvent());
        this.addEvent('user_move', new UserMoveEvent());
        this.addEvent('user_remove', new UserRemoveEvent());
    }

    private _registerUsers() {
        this.addEvent('new_connection', new ConnectEvent());
        this.addEvent('user_avatar', new UserAvatarEvent());
        this.addEvent('user_currency', new UserCurrencyEvent());
        this.addEvent('user_info', new UserInfoEvent());
    }

    getEvents(): Map<string, PacketEvent> {
        return this.events;
    }

    hasEvent(name: string): boolean {
        return this.events.has(name);
    }

    addEvent(name: string, packet: PacketEvent): boolean {
        if (this.hasEvent(name)) {
            return false;
        }

        this.events.set(name, packet);
        return this.hasEvent(name);
    }
}

export default Events;
