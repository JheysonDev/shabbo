import { Shroom } from "@jankuss/shroom";
import Connection from "../communication/Connection";
import { Application } from "pixi.js";
import RoomManager from "./rooms/RoomManager";
import UserManager from "./users/UserManager";
import UIManager from "./ui/UIManager";

class HotelManager {
    static user_id: number = Number(localStorage.getItem('user_id') || '0');

    private static connection: Connection;
    private static canvas: Application;
    private static game: Shroom;
    private static ui: UIManager;
    private static room: RoomManager;
    private static user: UserManager;

    run() {
        HotelManager.getConnection();
    }

    static getConnection(): Connection {
        if (!this.connection) {
            this.connection = new Connection();
        }

        return this.connection;
    }

    static getCanvas(): Application {
        if (!this.canvas) {
            this.canvas = new Application({
                width: window.innerWidth,
                height: window.innerHeight,
                resizeTo: window,
                resolution: window.devicePixelRatio,
                autoDensity: true,
                backgroundColor: 0x3F51B5,
            });
        }

        return this.canvas;
    }

    static getGame(): Shroom {
        if (!this.game) {
            this.game = Shroom.create({
                application: this.getCanvas(),
                resourcePath: "http://localhost:5500",
            });
        }

        return this.game;
    }

    static getUIManager(): UIManager {
        if (!this.ui) {
            this.ui = new UIManager();
        }

        return this.ui;
    }

    static getRoomManager(): RoomManager {
        if (!this.room) {
            this.room = new RoomManager();
        }

        return this.room;
    }

    static getUserManager(): UserManager {
        if (!this.user) {
            this.user = new UserManager();
        }

        return this.user;
    }
}

export default HotelManager;
