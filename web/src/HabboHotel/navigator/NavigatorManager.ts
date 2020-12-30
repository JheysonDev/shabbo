import { Subject } from "rxjs";

interface NavigatorEvents {
    add_room_model: Subject<[INavigatorRoom, number]>;
}

class NavigatorManager {
    private room_models: INavigatorRoom[];

    private events: NavigatorEvents;

    constructor() {
        this.room_models = [];

        this.events = {
            add_room_model: new Subject(),
        };
    }

    getRoomModels(): INavigatorRoom[] {
        return this.room_models;
    }

    hasRoomModel(id: number): boolean {
        return this.room_models.find((model) => model.id === id) != null;
    }

    addRoomModel(room_model: INavigatorRoom): boolean {
        if (this.hasRoomModel(room_model.id)) {
            return false;
        }

        this.room_models.push(room_model);
        this.events.add_room_model.next([room_model, this.room_models.length - 1]);

        return this.hasRoomModel(room_model.id);
    }

    onRoomModelAdd(event: (room_model: INavigatorRoom, index: number) => void): void {
        this.events.add_room_model.subscribe((room_model) => event(room_model[0], room_model[1]));
    }
}

export default NavigatorManager;
