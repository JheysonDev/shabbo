import clientStore from "../../data/stores/clientStore";
import { Container, Graphics, Sprite, Text, TextStyle } from "pixi.js";
import { Subject } from "rxjs";
import Input from "./Input";

class CreateRoomWindow extends Container {
    private generalBox = new Graphics();

    constructor() {
        super();

        this.addChild(this.generalBox);

        this.generalBox.lineStyle(1, 0x9E9E9E);
        this.generalBox.beginFill(0xE0E0E0, 0.8);
        this.generalBox.drawRoundedRect(0, 0, 450, 550, 4);
        this.generalBox.endFill();

        this._buildBox();
    }

    private _buildBox() {
        this._buildTitle();
        this._buildRoomModels();
        this._buildRoomName();
    }

    private titleContainer = new Container();

    private _buildTitle() {
        this.generalBox.addChild(this.titleContainer);

        this.titleContainer.x = 0;
        this.titleContainer.y = 12;

        const title = new Text('Create a room', new TextStyle({ fontFamily: 'Roboto', fontSize: 16, fontWeight: 'bold' }));
        this.titleContainer.addChild(title);

        title.x = this.generalBox.width / 2 - title.width / 2;
    }

    private _descriptionTextStyle = new TextStyle({ fontSize: 14, fontFamily: 'Roboto' });

    private roomModel = new Container();
    private roomModels: Container[] = [];
    private roomModelSelected: Subject<[Graphics, TextStyle]> = new Subject();
    private roomModelSelectedID: number = 0;

    private _buildRoomModels() {
        this.generalBox.addChild(this.roomModel);

        this.roomModel.x = 12;
        this.roomModel.y = this.titleContainer.height + this.titleContainer.y + 12;

        const title = new Text('1. Choose a model', this._descriptionTextStyle);
        this.roomModel.addChild(title);

        let loaded: boolean = false;

        this._onRoomModelChange();

        clientStore.subscribe(() => {
            const { main }: IClientStates = clientStore.getState();

            if (main.navigator_models.length && !loaded) {
                loaded = true;

                let current_state: [Graphics, TextStyle];

                this.roomModelSelected.subscribe((data) => {
                    current_state = data;
                });

                main.navigator_models.forEach((model, i) => {
                    const modelContainer = new Container();
                    this.roomModel.addChild(modelContainer);

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

                    const modelName = new Text(model.name, textStyle);
                    modelGraphics.addChild(modelName);

                    modelName.x = modelGraphics.width / 2 - modelName.width / 2;
                    modelName.y = 8;

                    const modelPrice = new Text(model.cost_credits ? `$${model.cost_credits}` : 'FREE', textStyle);
                    modelGraphics.addChild(modelPrice);

                    modelPrice.x = modelGraphics.width / 2 - modelPrice.width / 2;
                    modelPrice.y = modelGraphics.height - modelPrice.height - 8;

                    import(`../../assets/images/room_models/${model.id}.png`)
                        .then((modelImageFile) => {
                            const modelImage = Sprite.from(modelImageFile.default);
                            modelGraphics.addChild(modelImage);

                            modelImage.width = 71;
                            modelImage.height = 58;

                            modelImage.x = modelGraphics.width / 2 - modelImage.width / 2;
                            modelImage.y = modelGraphics.height / 2 - modelImage.height / 2;
                        })
                        .catch(console.error);

                    modelContainer.on('mouseover', async () => {
                        if (this.roomModelSelectedID != model.id) {
                            modelGraphics.clear();
                            modelGraphics.beginFill(0x9E9E9E, 0.25);
                            modelGraphics.drawRoundedRect(0, 0, 100, 110, 4);
                            modelGraphics.endFill();

                            textStyle.fill = ['#000000'];
                        }
                    });

                    modelContainer.on('mouseout', async () => {
                        if (this.roomModelSelectedID != model.id) {
                            modelGraphics.clear();
                            textStyle.fill = ['#616161'];
                        }
                    });

                    modelContainer.on('click', () => {
                        current_state[0].clear();
                        current_state[1].fill = ['#616161'];

                        this.roomModelSelected.next([modelGraphics, textStyle]);
                        this.roomModelSelectedID = model.id;
                    });

                    this.roomModels.push(modelContainer);

                    if (i === 0) {
                        this.roomModelSelected.next([modelGraphics, textStyle]);
                        this.roomModelSelectedID = model.id;
                    }
                });
            }
        });
    }

    private _onRoomModelChange() {
        this.roomModelSelected.subscribe((data) => {
            const [modelGraphics, textStyle] = data;

            modelGraphics.clear();
            modelGraphics.beginFill(0x3F51B5);
            modelGraphics.drawRoundedRect(0, 0, 100, 110, 4);
            modelGraphics.endFill();

            textStyle.fill = ['#FFFFFF'];
        });
    }

    private roomName = new Container();

    private _buildRoomName() {
        this.generalBox.addChild(this.roomName);

        this.roomName.x = 12;
        this.roomName.y = this.roomModel.height + this.roomModel.y + 130;

        const title = new Text('2. Set the name of the room', this._descriptionTextStyle);
        this.roomName.addChild(title);

        const input = new Input(
            'Room name',
            {
                width: this.generalBox.width - 24,
                max_length: 22,
            }
        );

        this.roomName.addChild(input);

        input.y = title.height + title.y + 8;
    }
}

export default CreateRoomWindow;
