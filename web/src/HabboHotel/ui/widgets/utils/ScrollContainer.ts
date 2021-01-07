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
    }

    private _buildMain(): Container {
        const main = new Container();

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

        this.scroll.mask = mask;
        this.main.addChild(mask);

        return mask;
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
