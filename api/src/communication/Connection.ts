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

    async getUser(): Promise<User> {
        return await SHabbo.getDatabase().getUsers().findOne(this.getUserID());
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
