import TextInput from "@HabboHotel/ui/widgets/forms/TextInput";
import HabboContainer from "@HabboHotel/ui/widgets/HabboContainer";
import HoverContainer from "@HabboHotel/ui/widgets/HoverContainer";
import SHabbo from "@SHabbo";
import { Container, Graphics, RoundedRectangle, Sprite, Text, TextStyle } from "pixi.js";
import Component from "../Component";

// Icons
import RoomsIcon from "@Assets/images/footer/rooms.png";
import CatalogueIcon from "@Assets/images/footer/catalogue.png";
import InventoryIcon from "@Assets/images/footer/inventory.png";

class FooterComponent extends Component {
    private _buildNavButton(icon: string, hover_text: string): Container {
        const button = new HoverContainer(hover_text, { width: 44, height: 50, direction: 'right' });

        button.buttonMode = true;

        const buttonIcon = Sprite.from(icon);
        button.addChild(buttonIcon);

        buttonIcon.width = 44;
        buttonIcon.height = 50;

        button.x = 8;

        return button;
    }

    private _buildUserButton(): Container {
        const userButton = new HoverContainer(SHabbo.getHotelManager().getUserManager().getData().username, { direction: 'top' });
        userButton.hitArea = new RoundedRectangle(0, 0, 60, 60, 4);
        userButton.buttonMode = true;

        SHabbo.getHotelManager().getUserManager().onInfoChange(({ username }) => {
            userButton.changeText(username);
        });

        const buttonBox = new Graphics();
        userButton.addChild(buttonBox);

        const radius = Math.sqrt(4 * 4 / 2);
        const size = 60;

        buttonBox.lineStyle(1, 0xf57c00);
        buttonBox.beginFill(0xff9800);

        buttonBox.drawPolygon([
            radius, 0,
            size, 0,
            size, size,
            radius, size,
            0, size - radius,
            0, radius,
        ]);

        buttonBox.endFill();

        return userButton;
    }

    private _buildChatTop(): Container {
        const container = new Container();

        const levelContainer = new Graphics();
        container.addChild(levelContainer);

        const levelText = new Text(
            'Level 1',
            new TextStyle({
                fill: ['#FFFFFF'],
                fontFamily: 'Roboto',
                fontSize: 14,
                fontWeight: '500'
            }),
        );

        levelContainer.addChild(levelText);

        levelContainer.beginFill(0x000000, 0.5);
        levelContainer.drawRect(0, 0, levelText.width + 16, levelText.height + 8);
        levelContainer.endFill();

        levelText.x = 8;
        levelText.y = 4;

        return container;
    }

    private _buildChatInput(): Container {
        const inputContainer = new Container();

        const input = new TextInput(
            'Write here...',
            {
                width: 400,
                radius: {
                    left_top: 0,
                    right_top: 4,
                    right_bottom: 4,
                    left_bottom: 0,
                },
            },
        );

        inputContainer.addChild(input);

        input.focus();

        return inputContainer;
    }

    private _buildActionsContainer(): Container {
        const container = new Container();

        const chatTop = this._buildChatTop();
        container.addChild(chatTop);

        chatTop.x = -1;
        chatTop.y = -1;

        const chatInput = this._buildChatInput();
        container.addChild(chatInput);

        chatInput.x = -1;
        chatInput.y = chatTop.height;

        return container;
    }

    private async _onRoomsButtonClick(): Promise<void> {
        await SHabbo.getHotelManager().getUIManager().getComponentsManager().toggle('create_room_window');
    }

    private async _onCatalogueButtonClick(): Promise<void> {
        await SHabbo.getHotelManager().getUIManager().getComponentsManager().toggle('catalogue_window');
    }

    private _navContainer: HabboContainer | null = null;
    private _roomsButton: Container | null = null;
    private _catalogueButton: Container | null = null;

    private _buildInRoomNavButtons(): void {
        if (SHabbo.getHotelManager().getRoomManager().isInRoom() && this._navContainer && this._catalogueButton) {
            this._navContainer.changeHeight(182);

            const inventoryButton = this._buildNavButton(InventoryIcon, 'Inventory');
            this._navContainer.addChild(inventoryButton);

            inventoryButton.y = this._catalogueButton.height + this._catalogueButton.y + 8;
        }
    }

    private _userButton: Container | null = null;
    private _userActions: Container | null = null;

    async build(): Promise<void> {
        this._navContainer = new HabboContainer(60, 124);
        this.container.zIndex = 1000;

        this.addChild(this._navContainer);

        this._roomsButton = this._buildNavButton(RoomsIcon, 'Create a room');
        this._roomsButton.y = 8;
        this._navContainer.addChild(this._roomsButton);

        this._roomsButton.addListener('click', async () => await this._onRoomsButtonClick());

        this._catalogueButton = this._buildNavButton(CatalogueIcon, 'Catalogue');
        this._catalogueButton.y = this._roomsButton.height + this._roomsButton.y + 8;
        this._navContainer.addChild(this._catalogueButton);

        this._catalogueButton.addListener('click', async () => await this._onCatalogueButtonClick());

        this._buildInRoomNavButtons();

        this._userButton = this._buildUserButton();
        this._userButton.y = this._navContainer.height + 8;
        this.addChild(this._userButton);

        this._userActions = this._buildActionsContainer();
        this.addChild(this._userActions);

        this._userActions.x = this._userButton.width;
        this._userActions.y = this._userButton.y;

        this.container.x = 16;
        this.container.y = this.screenHeight - this.container.height - 16;

        this.addToMain();
        this.setActive(true);
    }

    on(type: OnType, ...values: any[]): void {
        if (type === 'resize') {
            const [_, height] = values.map(Number);
            this.container.y = height - this.container.height - 16;
        } else if (type === 'room_data_update') {
            this._buildInRoomNavButtons();

            if (this._userButton && this._navContainer && this._userActions) {
                this._userButton.y = this._navContainer.height + 8;
                this._userActions.y = this._userButton.y;
            }

            this.container.y = this.screenHeight - this.container.height - 16;
        }
    }
}

export default FooterComponent;
