import { Container, Graphics, InteractionEvent, Text, TextStyle } from "pixi.js";

class WindowContainer extends Container {
    private width_window: number;
    private height_window: number;

    private box: Graphics;
    private title: Container;

    private dragging: boolean;
    private drag_coords: [number, number];

    constructor(title: string, width: number, height: number) {
        super();

        this.width_window = width;
        this.height_window = height;

        this.box = this._buildBox();
        this.title = this._buildTitle(title);

        this.dragging = false;
        this.drag_coords = [0, 0];

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

    private _buildTitle(title: string): Container {
        const title_container = new Container();
        this.box.addChild(title_container);

        title_container.interactive = true;
        title_container.buttonMode = true;

        const title_box = new Graphics();
        title_container.addChild(title_box);

        const title_text = new Text(title, new TextStyle({ fontFamily: 'Roboto', fontSize: 16, fontWeight: 'bold' }));
        title_box.beginFill(0xFFFFFF, 0).drawRect(0, 0, this.box.width, title_text.height + 24).endFill();
        title_box.addChild(title_text);

        title_text.x = title_box.width / 2 - title_text.width / 2;
        title_text.y = title_box.height / 2 - title_text.height / 2;

        return title_container;
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
        this.title
            .addListener('pointerdown', () => this._onDragStart())
            .addListener('pointermove', (e) => this._onDragMove(e))
            .addListener('pointerup', () => this._onDragEnd())
            .addListener('pointerupoutside', () => this._onDragEnd());
    }

    get title_height(): number {
        return this.title.height + this.title.y;
    }
}

export default WindowContainer;
