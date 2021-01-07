import { IComponent } from "./Component";

// General
import FooterComponent from "./general/FooterComponent";
import HeaderComponent from "./general/HeaderComponent";
import MainComponent from "./general/MainComponent";

// Rooms
import AvatarClickOptions from "./rooms/AvatarClickOptions";

// Windows
import CatalogueWindow from "./windows/CatalogueWindow";
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
        this.add('footer', new FooterComponent());
        this.add('header', new HeaderComponent());
        this.add('main', new MainComponent());
    }

    private _registerRooms(): void {
        this.add('avatar_click_options', new AvatarClickOptions());
    }

    private _registerWindows(): void {
        this.add('catalogue_window', new CatalogueWindow());
        this.add('create_room_window', new CreateRoomWindow());
    }

    forEach(fn: (component: IComponent) => void, only_active: boolean = false): void {
        for (const [_key, component] of this.components.entries()) {
            if (only_active && !component.isActive()) {
                continue;
            }

            fn(component);
        }
    }

    get(name: string): IComponent | null {
        return this.components.get(name) || null;
    }

    has(name: string): boolean {
        return this.components.has(name);
    }

    add(name: string, component: IComponent): void {
        if (this.has(name)) {
            return;
        }

        this.components.set(name, component);
    }

    async build(name: string): Promise<void> {
        const component = this.get(name);
        if (component && !component.isActive()) {
            await component.build();
        }
    }

    async toggle(name: string): Promise<void> {
        const component = this.get(name);
        if (component) {
            if (component.isActive()) {
                await component.dispose();
            } else {
                await component.build();
            }
        }
    }
}

export default ComponentsManager;
