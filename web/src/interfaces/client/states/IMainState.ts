import { Shroom } from "@jankuss/shroom";
import { Application } from "pixi.js";

interface IMainState {
    gameApplication: Application | null;
    gameManager: Shroom | null;
}

export default IMainState;
