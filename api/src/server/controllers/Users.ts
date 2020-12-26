import SHabbo from '@SHabbo';
import Controller from './Controller';

class UsersController extends Controller {
    constructor() {
        super('users');

        this.getRouter().get('/id/:id', async (req, res) => {
            const { id } = req.params;

            const user = await SHabbo.getDatabase().getUsers().findOne({ id: Number(id) });

            if (!user) {
                res.status(400).jsonp({ message: 'The user does not exist.' });
                return;
            }

            res.status(200).jsonp(user.toInterface());
        });

        this.getRouter().get('/username/:username', async (req, res) => {
            const { username } = req.params;

            const user = await SHabbo.getDatabase().getUsers().findOne({ username });

            if (!user) {
                res.status(400).jsonp({ message: 'The user does not exist.' });
                return;
            }

            res.status(200).jsonp(user.toInterface());
        });

        this.getRouter().post('/signup', async (req, res) => {
            const { username, gender }: IUser = req.body;

            if (!username || !gender) {
                res.status(400).jsonp({ message: 'You must enter the username and the gender.' });
                return;
            }

            if (await SHabbo.getDatabase().getUsers().findOne({ username })) {
                res.status(400).jsonp({ message: 'The username already exists.' });
                return;
            }

            const newUser = SHabbo.getDatabase().getUsers().create({ username, gender });

            await newUser.save();

            res.status(200).jsonp(newUser);
        });

        this.getRouter().post('/signin', async (req, res) => {
            const { username } = req.body;

            if (!username) {
                res.status(400).jsonp({ message: 'You must enter the username.' });
                return;
            }

            const user = await SHabbo.getDatabase().getUsers().findOne({ username });
            if (user) {
                res.status(200).jsonp({ user_id: user.id });
                return;
            }

            res.status(400).jsonp({ message: 'The user does not exist.' });
        });
    }
}

export default UsersController;
