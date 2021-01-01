import TextInput from "@HabboHotel/ui/widgets/forms/TextInput";
import SHabbo from "@SHabbo";
import { Container, Graphics, Sprite, Text, TextStyle } from "pixi.js";
import { Subject } from "rxjs";
import Component from "../Component";

class CreateRoomWindow extends Component {
    private _width: number = 450;
    private _height: number = 550;

    private _subTitleStyle: TextStyle = new TextStyle({ fontSize: 14, fontFamily: 'Roboto' });

    private _roomModelSelected: Subject<[Graphics, TextStyle]> = new Subject();
    private _roomModelSelectedID: number = 0;

    private _buildRoomModels(): Container {
        const roomModels = new Container();

        const title = new Text('1. Choose a model', this._subTitleStyle);
        roomModels.addChild(title);

        const models = new Container();
        roomModels.addChild(models);

        const modelsMask = new Graphics().beginFill(0xFFFFFF).drawRect(0, 0, 424, 110).endFill();
        models.mask = modelsMask;

        roomModels.addChild(modelsMask);

        const emptyModel = new Graphics();
        models.addChild(emptyModel);

        emptyModel.beginFill(0xFFFFFF);
        emptyModel.drawRoundedRect(0, 0, 100, 110, 4);
        emptyModel.endFill();

        emptyModel.y = title.height + title.y + 8;
        modelsMask.y = emptyModel.y;

        let current_state: [Graphics, TextStyle];

        this._roomModelSelected.subscribe(([modelGraphics, textStyle]) => {
            current_state = [modelGraphics, textStyle];

            modelGraphics.clear();
            modelGraphics.beginFill(0x3F51B5);
            modelGraphics.drawRoundedRect(0, 0, 100, 110, 4);
            modelGraphics.endFill();

            textStyle.fill = ['#FFFFFF'];
        });

        const _buildRoomModel = (room_model: INavigatorRoom, i: number): void => {
            if (models.children.includes(emptyModel)) {
                models.removeChild(emptyModel);
            }

            const modelContainer = new Container();
            models.addChild(modelContainer);

            modelContainer.x = 108 * i;
            modelContainer.y = title.height + title.y + 8;

            modelContainer.interactive = true;
            modelContainer.buttonMode = true;

            const modelGraphics = new Graphics();
            modelContainer.addChild(modelGraphics);

            modelGraphics.beginFill(0xFFFFFF, 0);
            modelGraphics.drawRoundedRect(0, 0, 100, 110, 4);
            modelGraphics.endFill();

            const textStyle = new TextStyle({
                fill: ['#616161'],
                fontSize: 10,
                fontWeight: 'bold',
                fontFamily: 'Roboto',
            });

            const modelName = new Text(room_model.name, textStyle);
            modelGraphics.addChild(modelName);

            modelName.x = modelGraphics.width / 2 - modelName.width / 2;
            modelName.y = 8;

            const modelImage = Sprite.from(`${SHabbo.getSetting('images_url')}room_models/${room_model.id}.png`);
            modelGraphics.addChild(modelImage);

            modelImage.width = 71;
            modelImage.height = 58;

            modelImage.x = modelGraphics.width / 2 - modelImage.width / 2;
            modelImage.y = modelGraphics.height / 2 - modelImage.height / 2;

            const modelPrice = new Text(room_model.cost_credits > 0 ? `${room_model.cost_credits}` : 'FREE', textStyle);
            modelGraphics.addChild(modelPrice);

            modelPrice.x = modelGraphics.width / 2 - modelPrice.width / 2;
            modelPrice.y = modelGraphics.height - modelPrice.height - 8;

            modelContainer.on('mouseover', () => {
                if (this._roomModelSelectedID != room_model.id) {
                    modelGraphics.clear();
                    modelGraphics.beginFill(0x9E9E9E, 0.25);
                    modelGraphics.drawRoundedRect(0, 0, 100, 110, 4);
                    modelGraphics.endFill();
    
                    textStyle.fill = ['#000000'];
                }
            });

            modelContainer.on('mouseout', () => {
                if (this._roomModelSelectedID != room_model.id) {
                    modelGraphics.clear();
                    textStyle.fill = ['#616161'];
                }
            });

            modelContainer.on('click', () => {
                current_state[0].clear();
                current_state[1].fill = ['#616161'];

                this._roomModelSelected.next([modelGraphics, textStyle]);
                this._roomModelSelectedID = room_model.id;
            });

            if (i === 0 && this._roomModelSelectedID === 0) {
                this._roomModelSelected.next([modelGraphics, textStyle]);
                this._roomModelSelectedID = room_model.id;
            }
        }

        SHabbo.getHotelManager().getNavigatorManager().getRoomModels().forEach((room_model, i) => _buildRoomModel(room_model, i));
        SHabbo.getHotelManager().getNavigatorManager().onRoomModelAdd((room_model, i) => _buildRoomModel(room_model, i));

        return roomModels;
    }

    private _roomNameInput: TextInput | null = null;

    private _buildroomName(): Container {
        const roomName = new Container();

        const title = new Text('2. Set the name of the room', this._subTitleStyle);
        roomName.addChild(title);

        this._roomNameInput = new TextInput('Room name', { width: this._width - 24, radius: 4, max_length: 22 });
        roomName.addChild(this._roomNameInput);
        this._roomNameInput.y = title.height + title.y + 8;

        return roomName;
    }

    build(): boolean {
        this.setActive(true);
        this.container.zIndex = 2;

        const box = new Graphics();
        this.addChild(box);

        box.lineStyle(1, 0x9E9E9E);
        box.beginFill(0xE0E0E0, 0.8);
        box.drawRoundedRect(0, 0, this._width, this._height, 4);
        box.endFill();

        const titleContainer = new Container();
        box.addChild(titleContainer);

        titleContainer.x = 0;
        titleContainer.y = 12;

        const title = new Text('Create a room', new TextStyle({ fontFamily: 'Roboto', fontSize: 16, fontWeight: 'bold' }));
        titleContainer.addChild(title);

        title.x = box.width / 2 - title.width / 2;

        const roomModels = this._buildRoomModels();
        box.addChild(roomModels);

        roomModels.x = 12;
        roomModels.y = titleContainer.height + titleContainer.y + 12;

        const roomName = this._buildroomName();
        box.addChild(roomName);

        roomName.x = 12;
        roomName.y = roomModels.height + roomModels.y + 8;

        this.container.x = ~~(this.screenWidth / 2 - this.container.width / 2);
        this.container.y = ~~(this.screenHeight / 2 - this.container.height / 2);

        return this.addToMain();
    }

    dispose(): boolean {
        this._roomModelSelectedID = 0;

        if (this._roomNameInput) {
            this._roomNameInput.dispose();
        }

        const removed = this.removeFromMain();
        this.container = new Container();
        this.setActive(false);

        return removed;
    }
}

export default CreateRoomWindow;
