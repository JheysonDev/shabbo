import IRoomModel from '@Interfaces/IRoomModel';
import SHabbo from '@SHabbo';
import Controller from './Controller';

class RoomsController extends Controller {
    constructor() {
        super('rooms');

        this.getRouter().post('/model', async (req, res) => {
            const { floor, door }: IRoomModel = req.body;

            if (!floor || !door) {
                res.status(400).jsonp({ message: 'You must enter the floor and the door coords.' });
                return;
            }

            const newRoomModel = SHabbo.getDatabase().getRoomModels().create({ floor, door: Object.values(door).join(';') });

            await newRoomModel.save();

            res.status(200).jsonp({ room_model: newRoomModel.toArray() });
        });
    }
}

export default RoomsController;
