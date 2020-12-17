import { useState } from 'react';
import { Application } from 'pixi.js';
import { Shroom } from '@jankuss/shroom';
import Connection from '../communication/Connection';
import IMainState from '../interfaces/client/states/IMainState';
import { useDispatch, useSelector } from 'react-redux';
import IClientStates from '../interfaces/client/states/IClientStates';
import { setGameApplication, setGameManager } from '../data/actions/client/mainActions';

function Client({ userID }: { userID: number }) {
    const [connection, setConnection] = useState<Connection | null>(null);
    const [gameElement, setGameElement] = useState<HTMLCanvasElement | null>(null);
    const dispatch = useDispatch();
    const main: IMainState = useSelector((states: IClientStates) => states.main);

    if (!connection) {
        setConnection(new Connection(userID));
        return null;
    }

    if (!main.gameApplication && gameElement) {
        dispatch(setGameApplication(new Application({
            view: gameElement,
            width: window.innerWidth,
            height: window.innerHeight,
        })))
    }

    if (main.gameApplication && !main.gameManager) {
        dispatch(setGameManager(Shroom.create({
            application: main.gameApplication,
            resourcePath: "http://localhost:5500"
        })));
    }

    window.onresize = () => {
        if (gameElement) {
            gameElement.width = window.innerWidth;
            gameElement.height = window.innerHeight;
        }
    };

    return (
        <div className="client">
            <canvas className="client__game" ref={setGameElement} />
        </div>
    );
}

export default Client;
