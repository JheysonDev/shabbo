import * as Express from 'express';
import { Server as HTTPServer, createServer } from 'http';
import Communication from '@Communication/Communication';
import * as Cors from 'cors';

// Controllers
import Controller from './controllers/Controller';
import RoomsController from './controllers/Rooms';
import UsersController from './controllers/Users';

class Server {
    private app: Express.Express;
    private http: HTTPServer;
    private communication: Communication;

    private controllers: Controller[];

    constructor() {
        this.app = Express();
        this.http = createServer(this.app);
        this.communication = new Communication(this.http);

        this.controllers = [
            new RoomsController(),
            new UsersController(),
        ];
    }

    getAPP(): Express.Express {
        return this.app;
    }

    getHTTP(): HTTPServer {
        return this.http;
    }

    getCommunication(): Communication {
        return this.communication;
    }

    async run(): Promise<void> {
        await this.getCommunication().run();

        this.getAPP().use(Cors({ optionsSuccessStatus: 200 }));

        this.getAPP().use(Express.urlencoded({ extended: true }));
        this.getAPP().use(Express.json());

        if (this.controllers.length) {
            this.controllers.forEach((controller) => {
                this.getAPP().use(`/${controller.getName()}`, controller.getRouter());
            });
        }
    }

    listen(): void {
        const host: string = process.env.API_HOST || '0.0.0.0';
        const port: number = Number(process.env.API_PORT || '5000');

        this.http.listen(port, host, () => {
            console.log(`Listening on ${host}:${port}`);
        });
    }
}

export default Server;
