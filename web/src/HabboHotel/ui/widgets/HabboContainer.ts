import { Container, Graphics } from "pixi.js";

class HabboContainer extends Container {
    private box: Graphics;

    constructor(
        private containerWidth: number,
        private containerHeight: number,
        private containerRadius?: Radius
    ) {
        super();

        this.box = new Graphics();
        this.addChild(this.box);

        this._draw();
    }

    private get radius(): Radius {
        return this.containerRadius ?? 4;
    }

    private _getRadius(radius: number): number {
        return Math.sqrt(radius * radius / 2);
    }

    private get radiusLeftTop(): number {
        return this._getRadius(typeof this.radius === 'number' ? this.radius : this.radius.left_top ?? 0);
    }

    private get radiusRightTop(): number {
        return this._getRadius(typeof this.radius === 'number' ? this.radius : this.radius.right_top ?? 0);
    }

    private get radiusRightBottom(): number {
        return this._getRadius(typeof this.radius === 'number' ? this.radius : this.radius.right_bottom ?? 0);
    }

    private get radiusLeftBottom(): number {
        return this._getRadius(typeof this.radius === 'number' ? this.radius : this.radius.left_bottom ?? 0);
    }

    private _draw(): void {
        this.box.clear();

        this.box.lineStyle(2, 0x000000, 0.4);
        this.box.beginFill(0x000000, 0.4);

        this.box.drawPolygon([
            this.radiusLeftTop, 0,
            this.containerWidth - this.radiusRightTop, 0,
            this.containerWidth, this.radiusRightTop,
            this.containerWidth, this.containerHeight - this.radiusRightBottom,
            this.containerWidth - this.radiusRightBottom, this.containerHeight,
            this.radiusLeftBottom, this.containerHeight,
            0, this.containerHeight - this.radiusLeftBottom,
            0, this.radiusLeftTop,
        ]);

        this.box.endFill();
    }

    changeWidth(width: number): void {
        this.containerWidth = width;
        this._draw();
    }

    changeHeight(height: number): void {
        this.containerHeight = height;
        this._draw();
    }

    changeRadius(radius: Radius): void {
        this.containerRadius = radius;
        this._draw();
    }
}

export default HabboContainer;
