import { Container, Graphics, Rectangle, Text, TextStyle } from "pixi.js";
import { Subject } from "rxjs";

class HabboWindow extends Container {
    private data: any;
    private dragging: boolean;

    private close: Subject<void>;

    constructor(private title: string) {
        super();

        this.data = null;
        this.dragging = false;

        this.close = new Subject();

        this._buildBox();
    }

    private _buildBox() {
        const boxTitle = new Graphics().lineStyle(2, 0x000000).beginFill(0x3F51B5).drawRect(0, 0, 350, 30).endFill();
        this.addChild(boxTitle);

        const boxClose = new Graphics().lineStyle(1, 0x000000).beginFill(0xF44336).drawRoundedRect(0, 0, 15, 15, 2).endFill();
        boxTitle.addChild(boxClose);

        boxClose.x = boxTitle.width - boxClose.width - 8;
        boxClose.y = boxTitle.height / 2 - boxClose.height / 2;

        const closeText = new Text('x', new TextStyle({ fontSize: 10, fontWeight: 'bold', fill: ['#FFFFFF'] }));
        boxClose.addChild(closeText);

        boxClose.zIndex = 10;
        boxClose.interactive = true;
        boxClose.hitArea = new Rectangle(0, 0, boxClose.width, boxClose.height);
        boxClose.on('click', () => this.close.next());

        closeText.x = (boxClose.width - closeText.width) / 2.5;

        boxTitle.interactive = true;
        boxTitle.buttonMode = true;

        boxTitle
            .on('pointerdown', (e: any) => this._onDragStart(e)).on('pointerup', () => this._onDragEnd())
            .on('pointerupoutside', () => this._onDragEnd()).on('pointermove', () => this._onDragMove());

        const boxContent = new Graphics().lineStyle(2, 0x000000).beginFill(0xFFFFFF).drawRect(0, 30, 350, 300).endFill();
        this.addChild(boxContent);

        const mask = new Graphics().beginFill(0x000000).drawRoundedRect(0, 0, 350, 330, 4).endFill();
        this.addChild(mask);

        this.mask = mask;

        const titleStyle = new TextStyle({
            fill: ['#FFFFFF'],
            fontSize: 12,
            fontWeight: 'medium',
            letterSpacing: 0.75,
        });

        const title = new Text(this.title, titleStyle);
        boxTitle.addChild(title);

        title.x = boxTitle.width / 2 - title.width / 2;
        title.y = boxTitle.height / 2 - title.height / 2;
    }

    private _onDragStart(e: any) {
        this.alpha = 0.5;
        this.data = e.data;
        this.dragging = true;
    }

    private _onDragMove() {
        if (this.dragging) {
            const { x, y } = this.data.global;

            this.x = x;
            this.y = y;
        }
    }

    private _onDragEnd() {
        this.alpha = 1;
        this.data = null;
        this.dragging = false;
    }

    onClose(event: () => void) {
        this.close.subscribe(() => event());
    }
}

export default HabboWindow;
