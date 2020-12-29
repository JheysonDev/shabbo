import Component from "./components/Component";

// General
import Header from "./components/general/Header";
import Main from "./components/general/Main";

class ComponentsManager {
    private components: Map<string, Component>;

    constructor() {
        this.components = new Map();

        this._registerComponents();
    }

    private _registerComponents(): void {
        this._registerGeneral();
    }

    private _registerGeneral(): void {
        this.addComponent('header', new Header());
        this.addComponent('main', new Main());
    }

    getComponent(name: string): Component | null {
        return this.components.get(name) || null;
    }

    hasComponent(name: string): boolean {
        return this.components.has(name);
    }

    addComponent(name: string, component: Component): void {
        if (this.hasComponent(name)) {
            return;
        }

        this.components.set(name, component);
    }
}

export default ComponentsManager;
