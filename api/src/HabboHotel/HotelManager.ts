import SHabbo from "@SHabbo";
import RoomsManager from "./rooms/RoomsManager";

class HotelManager {
    private roomsManager: RoomsManager;

    constructor() {
        this.roomsManager = new RoomsManager();
    }

    getRoomsManager(): RoomsManager {
        return this.roomsManager;
    }
}

export default HotelManager;
