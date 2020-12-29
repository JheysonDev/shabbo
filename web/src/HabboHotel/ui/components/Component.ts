import HotelManager from "../../HotelManager";
import { Container, DisplayObject } from "pixi.js";

class Component {
    protected container: Container;
    private active: boolean;

    constructor() {
        this.container = new Container();
        this.active = false;
    }

    hasChild(component: DisplayObject): boolean {
        return this.container.children.includes(component);
    }

    addChild(component: DisplayObject): DisplayObject {
        return this.container.addChild(component);
    }

    removeChild(component: DisplayObject): DisplayObject {
        return this.container.removeChild(component);
    }

    isActive(): boolean {
        return this.active;
    }

    setActive(active: boolean): void {
        this.active = active;
    }

    protected isInStage(): boolean {
        return HotelManager.getCanvas().stage.children.includes(this.container);
    }

    protected addToStage(): void {
        if (this.isInStage()) {
            return;
        }

        HotelManager.getCanvas().stage.addChild(this.container);
    }

    protected removeFromStage(): void {
        if (!this.isInStage()) {
            return;
        }

        HotelManager.getCanvas().stage.removeChild(this.container);
    }

    protected isInMain(): boolean {
        return HotelManager.getUIManager().isChildInMain(this.container);
    }

    protected addToMain(): boolean {
        return HotelManager.getUIManager().addChildToMain(this.container) != null;
    }

    protected removeFromMain(): boolean {
        return HotelManager.getUIManager().removeChildFromMain(this.container) != null;
    }

    protected get screenWidth(): number {
        return HotelManager.getCanvas().view.width;
    }

    protected get screenHeight(): number {
        return HotelManager.getCanvas().view.height;
    }

    build(): boolean {
        return false;
    }

    dispose(): boolean {
        return false;
    }
}

export default Component;
