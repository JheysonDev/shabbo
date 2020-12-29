import { DisplayObject } from "pixi.js";
import ComponentsManager from "./ComponentsManager";

class UIManager {
    private components: ComponentsManager;

    constructor() {
        this.components = new ComponentsManager();
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
