import { Container, DisplayObject, Graphics } from "pixi.js";

class ScrollContainer {
    private main: Container;
    private scroll: Container;
    private mask: Graphics;

    constructor(
        private width: number,
        private height: number,
    ) {
        this.main = this._buildMain();
        this.scroll = this._buildScroll();
        this.mask = this._buildMask();

        this._addListeners();
    }

    private _buildMain(): Container {
        const main = new Container();

        main.interactive = true;

        return main;
    }

    private _buildScroll(): Container {
        const scroll = new Container();
        this.main.addChild(scroll)

        return scroll;
    }

    private _buildMask(): Graphics {
        const mask = new Graphics();
        mask.lineStyle(1).beginFill().drawRect(0, 0, this.width, this.height).endFill();

        this.main.mask = mask;
        this.main.addChild(mask);

        return mask;
    }

    updateScrollPosition(): void {
        if (this.scroll.y > 0) {
            this.scroll.y = 0;
        }

        if (this.scroll.height > this.height) {
            const new_size_y: number = this.scroll.height + this.scroll.y;
            if (new_size_y < this.height) {
                this.scroll.y = this.height - this.scroll.height;
            }
        } else if (this.scroll.y < 0) {
            this.scroll.y = 0;
        }
    }

    private _onScroll(e: WheelEvent): void {
        if (this.scroll.height > this.height) {
            this.scroll.y -= e.deltaY;
            this.updateScrollPosition();
        }
    }

    private _addListeners(): void {
        this.main.on('scroll', (e: WheelEvent) => this._onScroll(e));
        this.scroll.on('scroll', (e: WheelEvent) => this._onScroll(e));
    }

    getMain(): Container {
        return this.main;
    }

    addChild(object: DisplayObject): DisplayObject {
        return this.scroll.addChild(object);
    }

    destroy(): void {
        this.main.destroy();
        this.main = new Container();

        this.scroll.destroy();
        this.scroll = new Container();

        this.mask.destroy();
        this.mask = new Graphics();
    }
}

export default ScrollContainer;
