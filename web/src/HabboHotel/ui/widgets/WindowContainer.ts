import { Container, Graphics, Text, TextStyle } from "pixi.js";

class WindowContainer extends Container {
    private _title: Container;

    constructor(title: string, width: number, height: number) {
        super();

        const box = new Graphics();
        this.addChild(box);

        box.lineStyle(1, 0x9E9E9E);
        box.beginFill(0xE0E0E0, 0.8);
        box.drawRoundedRect(0, 0, width, height, 4);
        box.endFill();

        this._title = new Container();
        box.addChild(this._title);

        this._title.x = 0;
        this._title.y = 12;

        const titleText = new Text(title, new TextStyle({ fontFamily: 'Roboto', fontSize: 16, fontWeight: 'bold' }));
        this._title.addChild(titleText);

        titleText.x = box.width / 2 - titleText.width / 2;
    }

    get title_height(): number {
        return this._title.height + this._title.y;
    }
}

export default WindowContainer;
