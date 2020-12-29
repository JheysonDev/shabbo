import HotelManager from "../../HotelManager";
import { Container, Graphics, Rectangle, Text, TextStyle } from "pixi.js";

class HoverContainer extends Container {
    private hover: Container;

    constructor(text: string, private options?: HoverTextProps) {
        super();

        this.interactive = true;
        this.hitArea = new Rectangle(options?.x, options?.y, options?.width, options?.height);

        this.hover = new Container();

        const textStyle = new TextStyle({
            fill: ['#FFFFFF'],
            fontSize: 10,
            fontWeight: 'medium',
            letterSpacing: 0.5,
        });

        const hoverText = new Text(text, textStyle);
        const hoverBox = new Graphics();

        hoverText.x = 8;
        hoverText.y = 4;

        hoverBox.beginFill(0x000000, 0.5);
        hoverBox.drawRoundedRect(0, 0, hoverText.width + hoverText.x * 2, hoverText.height + hoverText.y * 2, 4);
        hoverBox.endFill();

        this.hover.addChild(hoverBox);
        this.hover.addChild(hoverText);

        this.on('mouseover', this._onMouseOver);
        this.on('mousemove', this._onMouseMove);
        this.on('mouseout', this._onMouseOut);
    }

    private _calculateDirection(x: number, y: number): [number, number] {
        let coords: [number, number] = [x, y];

        if (this.options && this.options.direction) {
            switch (this.options.direction) {
                case 'top': {
                    coords[1] -= 6;
                    break;
                }

                case 'left': {
                    coords[0] -= 6;
                    break;
                }

                case 'right': {
                    coords[0] += 6;
                    break;
                }

                case 'bottom': {
                    coords[1] += 6;
                    break;
                }
            }
        } else {
            coords[0] += 6;
            coords[1] += 6;
        }

        return coords;
    }

    private _onMouseOver(e: any) {
        const { x, y } = e.data.global;
        const coords = this._calculateDirection(x, y);

        HotelManager.getCanvas().stage.addChild(this.hover);

        this.hover.x = coords[0];
        this.hover.y = coords[1];
    }

    private _onMouseMove(e: any) {
        const { x, y } = e.data.global;
        const coords = this._calculateDirection(x, y);

        this.hover.x = coords[0];
        this.hover.y = coords[1];
    }

    private _onMouseOut() {
        HotelManager.getCanvas().stage.removeChild(this.hover)
    }
}

export default HoverContainer;
