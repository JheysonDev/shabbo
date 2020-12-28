import User from '@Database/entities/users/User';
import SHabbo from '@SHabbo';
import { Socket } from 'socket.io';
import Events from './incoming/Events';
import Packet from './incoming/Packet';
import PacketComposer from './outgoing/PacketComposer';

class Connection {
    private events: Events;

    constructor(
        private socket: Socket,
        private userID: number,
    ) {
        this.events = new Events();
    }

    getUserID(): number {
        return this.userID;
    }

    private _user: User = null;

    async getUser(): Promise<User> {
        if (!this._user) {
            this._user = await SHabbo.getDatabase().getUsers().findOne(this.getUserID(), { relations: ['last_room'] });
        }

        return this._user;
    }

    handleEvents(): void {
        if (this.events.getEvents().size) {
            for (let [name, event] of Array.from(this.events.getEvents().entries())) {
                this.socket.on(name, async (data: string) => await event.execute(this, new Packet(data)));
            }
        }
    }

    async sendPacket(packet: PacketComposer): Promise<boolean> {
        try {
            await packet.execute();

            this.socket.emit(packet.getName(), packet.getData());

            return true;
        } catch (e) {
            console.log('Send Packet Error', e);
            return false;
        }
    }
}

export default Connection;
