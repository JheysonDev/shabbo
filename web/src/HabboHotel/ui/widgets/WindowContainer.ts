import { Container, Graphics, InteractionEvent, Text, TextStyle } from "pixi.js";

class WindowContainer extends Container {
    private width_window: number;
    private height_window: number;

    private box: Graphics;
    private title: Container;
    private title_box: Graphics;

    private dragging: boolean;
    private drag_coords: [number, number];

    private _on_close: (() => void) | null;

    constructor(title: string, width: number, height: number) {
        super();

        this.width_window = width;
        this.height_window = height;

        this.box = this._buildBox();
        this.title = this._buildTitle();
        this.title_box = this._buildTitleBox(title);

        this.dragging = false;
        this.drag_coords = [0, 0];

        this._on_close = null;

        this._buildTitleClose();
        this._addListeners();
    }

    private _buildBox(): Graphics {
        const box = new Graphics();
        this.addChild(box);

        box.lineStyle(1, 0x9E9E9E)
            .beginFill(0xE0E0E0, 0.8)
            .drawRoundedRect(0, 0, this.width_window, this.height_window, 4)
            .endFill();

        return box;
    }

    private _buildTitle(): Container {
        const title_container = new Container();
        this.box.addChild(title_container);

        return title_container;
    }

    private _buildTitleBox(title: string): Graphics {
        const title_box = new Graphics();
        this.title.addChild(title_box);

        title_box.interactive = true;
        title_box.buttonMode = true;

        const title_text = new Text(title, new TextStyle({ fontFamily: 'Roboto', fontSize: 16, fontWeight: 'bold' }));
        title_box.beginFill(0xFFFFFF, 0).drawRect(0, 0, this.box.width, title_text.height + 24).endFill();
        title_box.addChild(title_text);

        title_text.x = title_box.width / 2 - title_text.width / 2;
        title_text.y = title_box.height / 2 - title_text.height / 2;

        return title_box;
    }

    private _buildTitleClose(): void {
        const title_close = new Graphics();
        this.title.addChild(title_close);

        const close_text = new Text(
            'x',
            new TextStyle({
                fill: ['#FFFFFF'],
                fontFamily: 'Roboto',
                fontSize: 13,
                fontWeight: '400',
            }),
        );

        title_close.addChild(close_text);

        title_close
            .lineStyle(1, 0xf44336)
            .beginFill(0xe57373)
            .drawRoundedRect(0, 0, ~~(close_text.width + 16), ~~(close_text.height + 8), 4)
            .endFill();

        title_close.x = ~~(this.title.width - title_close.width - 12);
        title_close.y = ~~(this.title.height / 2 - title_close.height / 2);

        title_close.interactive = true;
        title_close.buttonMode = true;

        title_close.addListener('click', () => {
            if (this._on_close) {
                this._on_close();
            } else {
                this.destroy();
            }
        });

        close_text.x = ~~(title_close.width / 2 - close_text.width / 2);
        close_text.y = ~~(title_close.height / 2 - close_text.height / 2);
    }

    private _onDragStart(): void {
        this.dragging = true;
        this.drag_coords = [this.x, this.y];
    }

    private _onDragMove(e: InteractionEvent): void {
        if (this.dragging) {
            const new_position = e.data.getLocalPosition(this.parent);
            const [last_x, last_y] = this.drag_coords;

            this.x = new_position.x - last_x;
            this.y = new_position.y - last_y;
        }
    }

    private _onDragEnd(): void {
        this.dragging = false;
        this.drag_coords = [0, 0];
    }

    private _addListeners(): void {
        this.title_box
            .addListener('pointerdown', () => this._onDragStart())
            .addListener('pointermove', (e) => this._onDragMove(e))
            .addListener('pointerup', () => this._onDragEnd())
            .addListener('pointerupoutside', () => this._onDragEnd());
    }

    set onClose(event: (() => void) | null) {
        this._on_close = event;
    }

    get title_height(): number {
        return this.title.height + this.title.y;
    }
}

export default WindowContainer;
