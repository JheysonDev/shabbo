import { useState, useEffect } from 'react';
import Axios from 'axios';
import IUser from '../interfaces/IUser';
import { API_URL } from '../utils/variables';
import { Application } from 'pixi.js';
import { Shroom } from '@jankuss/shroom';
import IClientState from '../interfaces/IClientState';

function Client({ userID }: { userID: number }) {
    const [userData, setUserData] = useState<IUser | null>(null);
    const [fetched, setFetched] = useState<boolean>(false);
    const [gameElement, setGameElement] = useState<HTMLCanvasElement | null>(null);
    const [pixiAPP, setPixiAPP] = useState<Application | null>(null);
    const [gameManager, setGameManager] = useState<Shroom | null>(null);

    const [clientState, setClientState] = useState<IClientState>({
        current_room_id: 0,
    });

    if (!userData && !fetched) {
        setFetched(true);

        Axios.get(`${API_URL}/users/id/${userID}`)
            .then((data) => setUserData(data.data))
            .catch(console.error);
    }

    useEffect(() => {
        if (gameElement && !pixiAPP) {
            setPixiAPP(new Application({
                view: gameElement,
                width: window.innerWidth,
                height: window.innerHeight
            }));
        }
    }, [gameElement, pixiAPP]);

    useEffect(() => {
        if (pixiAPP && !gameManager) {
            setGameManager(Shroom.create({
                application: pixiAPP,
                resourcePath: "http://localhost:5500"
            }));
        }
    }, [pixiAPP, gameManager]);

    if (!userData) {
        return null;
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

