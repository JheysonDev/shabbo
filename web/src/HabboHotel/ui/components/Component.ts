import { Avatar } from "@jankuss/shroom";
import SHabbo from "@SHabbo";
import { Container, DisplayObject } from "pixi.js";

export interface IComponent {
    hasChild(component: DisplayObject): boolean;
    addChild(component: DisplayObject): DisplayObject;
    removeChild(component: DisplayObject): DisplayObject;

    isActive(): boolean;
    setActive(active: boolean): void;

    on(type: 'resize', width: number, height: number): void;
    on(type: 'tick'): void;

    on(type: 'room_data_update'): void;
    on(type: 'user_room_clicked', avatar: Avatar, user: IRoomUser): void;

    build(): void;
    dispose(): void;
}

class Component implements IComponent {
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
        return SHabbo.getHotelManager().getApplication().stage.children.includes(this.container);
    }

    protected addToStage(): void {
        if (this.isInStage()) {
            return;
        }

        SHabbo.getHotelManager().getApplication().stage.addChild(this.container);
    }

    protected removeFromStage(): void {
        if (!this.isInStage()) {
            return;
        }

        SHabbo.getHotelManager().getApplication().stage.removeChild(this.container);
    }

    protected isInMain(): boolean {
        return SHabbo.getHotelManager().getUIManager().isChildInMain(this.container);
    }

    protected addToMain(): boolean {
        return SHabbo.getHotelManager().getUIManager().addChildToMain(this.container) != null;
    }

    protected removeFromMain(): boolean {
        return SHabbo.getHotelManager().getUIManager().removeChildFromMain(this.container) != null;
    }

    protected get screenWidth(): number {
        return SHabbo.getHotelManager().getApplication().screen.width;
    }

    protected get screenHeight(): number {
        return SHabbo.getHotelManager().getApplication().screen.height;
    }

    build(): void {}
    on(type: OnType, ...values: any[]): void {}
    dispose(): void {}
}

export default Component;
