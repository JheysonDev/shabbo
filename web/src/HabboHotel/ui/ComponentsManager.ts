import Header from "./components/Header";

class ComponentsManager {
    private components: Map<string, IComponent>;

    constructor() {
        this.components = new Map();

        this._registerComponents();
    }

    private _registerComponents(): void {
        this.addComponent('header', new Header());
    }

    getComponent(name: string): IComponent | null {
        return this.components.get(name) || null;
    }

    hasComponent(name: string): boolean {
        return this.components.has(name);
    }

    addComponent(name: string, component: IComponent): void {
        if (this.hasComponent(name)) {
            return;
        }

        this.components.set(name, component);
    }
}

export default ComponentsManager;
