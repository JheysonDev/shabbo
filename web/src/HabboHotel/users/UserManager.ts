import { Subject } from "rxjs";

class UserManager {
    private connected: boolean;
    private data: IUser;

    private currency_event: Subject<void>;

    constructor() {
        this.connected = false;

        this.data = {
            id: 0,
            username: '',
            gender: 'M',
            look: '',
            motto: '',
            online: true,
            credits: 0,
            diamonds: 0,
        };

        this.currency_event = new Subject();
    }

    isConnected(): boolean {
        return this.connected;
    }

    setConnected(connected: boolean): void {
        this.connected = connected;
    }

    getData(): IUser {
        return this.data;
    }

    setData(data: Partial<IUser>): void {
        if (data.credits || data.diamonds) {
            this.currency_event.next();
        }

        this.data = { ...this.data, ...data };
    }

    onCurrencyChange(event: () => void): void {
        this.currency_event.subscribe(() => event());
    }
}

export default UserManager;
