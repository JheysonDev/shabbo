import PacketEvent from "./PacketEvent";

// Handshake
import PingEvent from "./handshake/PingEvent";

// Users
import ConnectEvent from "./users/ConnectEvent";
import UserAvatarEvent from "./users/UserAvatarEvent";
import UserCurrencyEvent from "./users/UserCurrencyEvent";
import UserInfoEvent from "./users/UserInfoEvent";

class Events {
    private events: Map<string, PacketEvent>;

    constructor() {
        this.events = new Map();

        this.registerEvents();
    }

    private registerEvents() {
        // Handshake
        this.addEvent('ping', new PingEvent());

        // Users
        this.addEvent('connect', new ConnectEvent());
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
