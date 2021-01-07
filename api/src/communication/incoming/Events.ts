import PacketEvent from "./PacketEvent";

// Catalogue
import OpenCataloPageEvent from "./catalogue/OpenCatalogPageEvent";

// Handshake
import PongEvent from "./handshake/PongEvent";

// Navigator
import OpenCreateRoomEvent from "./navigator/OpenCreateRoomEvent";

// Rooms
import MoveToEvent from "./rooms/users/MoveToEvent";
import GoToRoomEvent from "./rooms/GoToRoomEvent";

// Users
import DisconnectEvent from "./users/DisconnectEvent";

class Events {
    private events: Map<string, PacketEvent>;

    constructor() {
        this.events = new Map();

        this._registerEvents();
    }

    private _registerEvents(): void {
        this._registerCatalogue();
        this._registerHandshake();
        this._registerNavigator();
        this._registerRooms();
        this._registerUsers();
    }

    private _registerCatalogue(): void {
        this.addEvent('open_catalog_page', new OpenCataloPageEvent());
    }

    private _registerHandshake(): void {
        this.addEvent('pong', new PongEvent());
    }

    private _registerNavigator(): void {
        this.addEvent('open_create_room', new OpenCreateRoomEvent());
    }

    private _registerRooms(): void {
        this.addEvent('move_to', new MoveToEvent());

        this.addEvent('go_to_room', new GoToRoomEvent());
    }

    private _registerUsers(): void {
        this.addEvent('disconnect', new DisconnectEvent());
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
