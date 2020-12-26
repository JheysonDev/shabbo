import IconButton from "../../components/client/IconButton";
import { Application } from "pixi.js";
import CreateRoomIcon from "../../assets/images/icons/create_room.png";
import CreateRoomWindow from "../../components/client/CreateRoomWindow";
import Connection from "../../communication/Connection";
import OpenCreateRoomComposer from "../../communication/outgoing/navigator/OpenCreateRoomComposer";

function Navigation(gameApplication: Application, connection: Connection) {
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

    let createRoomWindow: CreateRoomWindow | null = null;

    createRoomButton.onClick(async () => {
        if (createRoomWindow) {
            gameApplication.stage.removeChild(createRoomWindow);
            createRoomWindow = null;
        } else {
            await connection.sendPacket(new OpenCreateRoomComposer());

            createRoomWindow = new CreateRoomWindow();
            gameApplication.stage.addChild(createRoomWindow);

            createRoomWindow.x = 35;
            createRoomWindow.y = 35;
        }
    });
}

export default Navigation;
