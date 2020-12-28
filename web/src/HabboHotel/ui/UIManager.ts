import ComponentsManager from "./ComponentsManager";

class UIManager {
    private components: ComponentsManager;

    constructor() {
        this.components = new ComponentsManager();
    }

    getComponentsManager(): ComponentsManager {
        return this.components;
    }
}

export default UIManager;
