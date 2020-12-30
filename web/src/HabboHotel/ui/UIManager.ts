import HotelManager from "../HotelManager";
import { DisplayObject } from "pixi.js";
import { Subject } from "rxjs";
import ComponentsManager from "./ComponentsManager";

class UIManager {
    private resize: Subject<[number, number]>;

    private components: ComponentsManager;

    constructor() {
        this.resize = new Subject();

        this.components = new ComponentsManager();
    }

    run(): void {
        window.onresize = () => {
            const { width, height } = HotelManager.getCanvas().screen;
            this.resize.next([width, height]);

            this.getComponentsManager().forEach((component) => component.on('resize', width, height), true);
        };

        HotelManager.getCanvas().ticker.add(() => this.getComponentsManager().forEach((component) => component.on('tick'), true));
    }

    onResize(event: (size: [number, number]) => void): void {
        this.resize.subscribe((size) => event(size));
    }

    getComponentsManager(): ComponentsManager {
        return this.components;
    }

    isChildInMain(component: DisplayObject): boolean {
        const main = this.getComponentsManager().getComponent('main');
        if (!main || !main.isActive()) {
            return false;
        }

        return main.hasChild(component);
    }

    addChildToMain(component: DisplayObject): DisplayObject | null {
        const main = this.getComponentsManager().getComponent('main');
        if (this.isChildInMain(component) || !main || !main.isActive()) {
            return null;
        }

        return main.addChild(component);
    }

    removeChildFromMain(component: DisplayObject): DisplayObject | null {
        const main = this.getComponentsManager().getComponent('main');
        if (!this.isChildInMain(component) || !main || !main.isActive()) {
            return null;
        }

        return main.removeChild(component);
    }
}

export default UIManager;
