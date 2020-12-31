import { Application } from "pixi.js";
import { Shroom } from "@jankuss/shroom";
import SHabbo from "@SHabbo";
import UIManager from "./ui/UIManager";
import UserManager from "./users/UserManager";
import NavigatorManager from "./navigator/NavigatorManager";
import Connection from "@Communication/Connection";
import RoomManager from "./rooms/RoomManager";

class HotelManager {
    private connection: Connection;

    private application: Application;
    private game: Shroom;

    private ui: UIManager;
    private navigator: NavigatorManager;
    private room: RoomManager;
    private user: UserManager;

    constructor() {
        this.connection = new Connection();

        this.application = new Application({
            width: window.innerWidth,
            height: window.innerHeight,
            resizeTo: window,
            antialias: false,
            resolution: window.devicePixelRatio,
            autoDensity: true,
            backgroundColor: 0x3F51B5,
        });

        this.game = Shroom.create({
            application: this.application,
            resourcePath: SHabbo.getSetting('resources_url', 'http://localhost:5500/'),
        });

        this.ui = new UIManager();
        this.navigator = new NavigatorManager();
        this.room = new RoomManager();
        this.user = new UserManager();
    }

    run(): void {
        const main = this.getUIManager().getComponentsManager().getComponent('main');
        if (main && !main.isActive()) {
            main.build();
        }

        window.onresize = () => {
            const { width, height } = this.application.screen;
            this.ui.getComponentsManager().forEach((component) => component.on('resize', width, height), true);
        };

        this.application.ticker.add(() => this.ui.getComponentsManager().forEach((component) => component.on('tick'), true));
    }

    getConnection(): Connection {
        return this.connection;
    }

    getApplication(): Application {
        return this.application;
    }

    getGame(): Shroom {
        return this.game;
    }

    getUIManager(): UIManager {
        return this.ui;
    }

    getNavigatorManager(): NavigatorManager {
        return this.navigator;
    }

    getRoomManager(): RoomManager {
        return this.room;
    }

    getUserManager(): UserManager {
        return this.user;
    }
}

export default HotelManager;
