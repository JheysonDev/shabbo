import { Shroom } from "@jankuss/shroom";
import { Application } from "pixi.js";
import Action from "../Action";

export const SET_GAME_APPLICATION = 'SET_GAME_APPLICATION';

export const setGameApplication = (gameApplication: Application | null): Action<Application | null> => {
    return {
        type: SET_GAME_APPLICATION,
        payload: gameApplication,
    };
}

export const SET_GAME_MANAGER = 'SET_GAME_MANAGER';

export const setGameManager = (gameManager: Shroom | null): Action<Shroom | null> => {
    return {
        type: SET_GAME_MANAGER,
        payload: gameManager,
    };
}
