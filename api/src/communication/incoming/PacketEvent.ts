import Connection from '../Connection';
import Packet from './Packet';

interface PacketEvent {
    execute(connection: Connection, packet: Packet): Promise<void>;
}

export default PacketEvent;
