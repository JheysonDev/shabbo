import { Avatar, Room } from "@jankuss/shroom";
import SHabbo from "@SHabbo";
import { Container, Graphics, Text, TextStyle } from "pixi.js";
import Component from "../Component";

class AvatarClickOptions extends Component {
    private _room: Room | null = null;

    private _avatar: Avatar | null = null;
    private _user: IRoomUser | null = null;

    private _box: Graphics = new Graphics();

    private _drawBox(): void {
        if (!this._avatar || !this._user) {
            return;
        }

        if (this.container.children.includes(this._box)) {
            this.removeChild(this._box);
        }

        this._box = new Graphics();
        this.addChild(this._box);

        const username = new Text(
            this._user.username,
            new TextStyle({
                fill: ['#FFFFFF'],
                fontFamily: 'Roboto',
                fontSize: 14,
                fontWeight: '500',
            }),
        );

        this._box.addChild(username);

        const width = username.width + 32;
        const height = username.height + 8;
        const radius = Math.sqrt(2);

        this._box.lineStyle(1, 0x212121);
        this._box.beginFill(0x424242);

        this._box.drawPolygon([
            radius, 0,
            width - radius, 0,
            width, radius,
            width, height - radius,
            width - radius, height,
            radius, height,
            0, height - radius,
            0, radius,
        ]);

        this._box.endFill();

        username.x = width / 2 - username.width / 2;
        username.y = height / 2 - username.height / 2;
    }

    private _updateContainer(): void {
        if (!this._avatar) {
            return;
        }

        const { x, y } = this._avatar.getScreenPosition();

        this.container.x = x + this.container.width / 8 - 6;
        this.container.y = y - this.container.height + 10;
    }

    build(): boolean {
        this._room = SHabbo.getHotelManager().getRoomManager().getRoom();

        if (this._room) {
            this._room.addChild(this.container);
            this.setActive(true);

            return true;
        }

        return false;
    }

    on(type: OnType, ...values: any[]): void {
        if (type === 'tick') {
            if (!this.container.children.includes(this._box)) {
                this._drawBox();
            }

            this._updateContainer();
        } else if (type === 'user_room_clicked') {
            const [avatar, user] = values as [Avatar, IRoomUser];

            this._avatar = avatar;
            this._user = user;

            this._drawBox();
            this._updateContainer();
        }
    }

    dispose(): boolean {
        if (this._room) {
            this._room.removeChild(this.container);
            this.container = new Container();
            this.setActive(false);

            return true;
        }

        return false;
    }
}

export default AvatarClickOptions;
