import { Application } from "pixi.js";
import { Shroom } from "@jankuss/shroom";
import HotelView from "./client/HotelView";
import Connection from "../communication/Connection";
import clientStore from "../data/stores/clientStore";
import Header from "./client/Header";
import Navigation from "./client/Navigation";

function ClientPage({ userID }: { userID: number }) {
    require('./styles/Client.scss');

    const connection = new Connection(userID);

    const body = document.body;

    const clientPage = document.createElement('div');
    clientPage.classList.add('client');

    const gameApplication = new Application({
        width: window.innerWidth,
        height: window.innerHeight,
        resizeTo: window,
        resolution: window.devicePixelRatio,
        autoDensity: true,
    });

    const gameManager = Shroom.create({
        application: gameApplication,
        resourcePath: "http://localhost:5500",
    });

    const viewStates = {
        header: false,
        hotel_view: false,
        navigation: false,
    };

    clientStore.subscribe(() => {
        const state: IClientStates = clientStore.getState();

        if (state.user.connected) {
            if (state.user.current_room === 0 && !viewStates.hotel_view) {
                viewStates.hotel_view = true;
                HotelView(gameApplication);
            } else if (state.user.user.currency && !viewStates.header) {
                viewStates.header = true;
                Header(gameApplication);
            } else if (!viewStates.navigation) {
                viewStates.navigation = true;
                Navigation(gameApplication);
            }
        }
    });

    clientPage.append(gameApplication.view);

    body.append(clientPage);
}

export default ClientPage;
