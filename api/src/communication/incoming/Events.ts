import PacketEvent from "./PacketEvent";

// Handshake
import PongEvent from "./handshake/PongEvent";

// Navigator
import OpenCreateRoomEvent from "./navigator/OpenCreateRoomEvent";

// Users
import DisconnectEvent from "./users/DisconnectEvent";

class Events {
    private events: Map<string, PacketEvent>;

    constructor() {
        this.events = new Map();

        this.registerEvents();
    }

    private registerEvents(): void {
        // Handshake
        this.addEvent('pong', new PongEvent());

        // Navigator
        this.addEvent('open_create_room', new OpenCreateRoomEvent());

        // Users
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
