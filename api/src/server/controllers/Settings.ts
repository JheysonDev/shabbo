import SHabbo from "@SHabbo";
import Controller from "./Controller";

class SettingsController extends Controller {
    constructor() {
        super('settings');

        this.getRouter().get('/all', (req, res) => {
            res.status(200).jsonp(SHabbo.getHotel().getSettings());
        });
    }
}

export default SettingsController;
