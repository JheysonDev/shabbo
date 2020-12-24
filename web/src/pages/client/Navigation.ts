import IconButton from "../../components/client/IconButton";
import { Application } from "pixi.js";
import CreateRoomIcon from "../../assets/images/icons/create_room.png";
import HabboWindow from "../../components/client/HabboWindow";

function Navigation(gameApplication: Application) {
    const createRoomButton = new IconButton(
        'background',
        gameApplication,
        {
            icon: CreateRoomIcon,

            hover_text: 'Create a room',

            background_color: { hex: 0x000000, alpha: 0.4 },
            border_color: { hex: 0x000000, alpha: 0.4 }
        }
    );

    gameApplication.stage.addChild(createRoomButton);

    createRoomButton.x = 8;
    createRoomButton.y = gameApplication.screen.height - 8;

    createRoomButton.onRadiusChange((radius) => {
        createRoomButton.y -= radius * 2;
    });

    let createRoomWindow: HabboWindow | null = null;

    createRoomButton.onClick(() => {
        if (createRoomWindow) {
            gameApplication.stage.removeChild(createRoomWindow);
            createRoomWindow = null;
        } else {
            createRoomWindow = new HabboWindow('Create a room');
            gameApplication.stage.addChild(createRoomWindow);

            createRoomWindow.x = 35;
            createRoomWindow.y = 35;

            createRoomWindow.onClose(() => {
                if (createRoomWindow) {
                    gameApplication.stage.removeChild(createRoomWindow);
                    createRoomWindow = null;
                }
            });
        }
    });
}

export default Navigation;
