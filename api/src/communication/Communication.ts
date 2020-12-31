import SHabbo from '@SHabbo';
import { Server as HTTPServer } from 'http';
import { Server as SocketServer, Socket } from 'socket.io';
import Connection from './Connection';
import ConnectComposer from './outgoing/users/ConnectComposer';

class Communication {
    private server: SocketServer;
    private connections: Connection[];

    constructor(http: HTTPServer) {
        const hotel_url = SHabbo.getHotel().getSetting('hotel_url', 'http://localhost:3000/');

        this.server = new SocketServer(
            http,
            {
                cors: {
                    origin: hotel_url.endsWith('/') ? hotel_url.slice(0, hotel_url.length - 1) : hotel_url,
                    methods: ['GET', 'POST']
                }
            }
        );

        this.connections = [];
    }

    getConnection(userID: number): Connection {
        return this.connections.find((con) => con.getUserID() === userID);
    }

    hasConnection(connection: Connection): boolean {
        return this.getConnection(connection.getUserID()) != null;
    }

    addConnection(connection: Connection): boolean {
        if (this.hasConnection(connection)) {
            return false;
        }

        this.connections.push(connection);
        return this.hasConnection(connection);
    }

    removeConnection(connection: Connection): boolean {
        if (!this.hasConnection(connection)) {
            return false;
        }

        this.connections.splice(this.connections.findIndex((con) => con.getUserID() === connection.getUserID()), 1);
        return !this.hasConnection(connection);
    }

    async run(): Promise<void> {
        this.server.on('connection', async (socket: Socket) => {
            const connection = new Connection(socket, Number((socket.handshake.query as any).user_id) || 0);
            const user = await connection.getUser();

            if (user) {
                if (this.addConnection(connection)) {
                    await connection.sendPacket(new ConnectComposer(user, connection));
                }
            }
        });
    }
}

export default Communication;
