import { Container, Graphics } from "pixi.js";

class HabboContainer extends Container {
    constructor(width: number, height: number) {
        super();

        const box = new Graphics();
        this.addChild(box);

        box.lineStyle(2, 0x000000, 0.4);
        box.beginFill(0x000000, 0.4);
        box.drawRoundedRect(0, 0, width, height, 4);
        box.endFill();
    }
}

export default HabboContainer;
