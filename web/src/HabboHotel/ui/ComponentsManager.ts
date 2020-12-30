import Component, { IComponent } from "./components/Component";

// General
import Footer from "./components/general/Footer";
import Header from "./components/general/Header";
import Main from "./components/general/Main";

// Rooms
import AvatarClickOptions from "./components/rooms/AvatarClickOptions";

// Windows
import CreateRoomWindow from "./components/windows/CreateRoomWindow";

class ComponentsManager {
    private components: Map<string, IComponent>;

    constructor() {
        this.components = new Map();

        this._registerComponents();
    }

    private _registerComponents(): void {
        this._registerGeneral();
        this._registerRooms();
        this._registerWindows();
    }

    private _registerGeneral(): void {
        this.addComponent('footer', new Footer());
        this.addComponent('header', new Header());
        this.addComponent('main', new Main());
    }

    private _registerRooms(): void {
        this.addComponent('avatar_click_options', new AvatarClickOptions());
    }

    private _registerWindows(): void {
        this.addComponent('create_room_window', new CreateRoomWindow());
    }

    forEach(fn: (component: IComponent) => void, only_active: boolean = false): void {
        for (const [_key, component] of this.components.entries()) {
            if (only_active && !component.isActive()) {
                continue;
            }

            fn(component);
        }
    }

    getComponent(name: string): IComponent | null {
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
