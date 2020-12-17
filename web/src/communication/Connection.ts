import SocketIO from 'socket.io-client';
import { API_URL } from '../utils/variables';
import Events from './incoming/Events';
import Packet from './incoming/Packet';
import PacketComposer from './outgoing/PacketComposer';

class Connection {
    private socket: SocketIO.Socket;
    private events: Events;

    constructor(private userID: number) {
        this.socket = SocketIO.io(`${API_URL}/?user_id=${this.userID}`);
        this.events = new Events();

        this.handleEvents();
    }

    private handleEvents(): void {
        if (this.events.getEvents().size) {
            for (let [name, packet] of Array.from(this.events.getEvents().entries())) {
                this.socket.on(name, async (data: any) => {
                    await packet.execute(this, new Packet(data));
                });
            }
        }
    }

    async sendPacket(packet: PacketComposer): Promise<boolean> {
        try {
            await packet.execute();

            this.socket.emit(packet.getName(), packet.getData());

            return true;
        } catch(e) {
            return false;
        }
    }
}

export default Connection;
