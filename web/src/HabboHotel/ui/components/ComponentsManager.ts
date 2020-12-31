import { IComponent } from "./Component";

// General
import FooterComponent from "./general/FooterComponent";
import HeaderComponent from "./general/HeaderComponent";
import MainComponent from "./general/MainComponent";

// Rooms
import AvatarClickOptions from "./rooms/AvatarClickOptions";

// Windows
import CreateRoomWindow from "./windows/CreateRoomWindow";

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
        this.addComponent('footer', new FooterComponent());
        this.addComponent('header', new HeaderComponent());
        this.addComponent('main', new MainComponent());
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

    addComponent(name: string, component: IComponent): void {
        if (this.hasComponent(name)) {
            return;
        }

        this.components.set(name, component);
    }
}

export default ComponentsManager;
