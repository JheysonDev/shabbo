import { Subject } from "rxjs";

interface UserEvents {
    info_update: Subject<{ username: string, look: string, motto: string }>;
    currency_update: Subject<{ credits: number, diamonds: number }>;
}

class UserManager {
    private connected: boolean;
    private data: IUser;

    private events: UserEvents;

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

        this.events = {
            info_update: new Subject(),
            currency_update: new Subject(),
        };
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
        this.data = { ...this.data, ...data };

        if (data.username || data.look || data.motto) {
            this.events.info_update.next({
                username: this.data.username,
                look: this.data.look,
                motto: this.data.motto,
            });
        } else if (data.credits || data.diamonds) {
            this.events.currency_update.next({
                credits: this.data.credits,
                diamonds: this.data.diamonds,
            });
        }
    }

    onInfoChange(event: (info: { username: string, look: string, motto: string }) => void): void {
        this.events.info_update.subscribe((info) => event(info));
    }

    onCurrencyChange(event: (currency: { credits: number, diamonds: number }) => void): void {
        this.events.currency_update.subscribe((currency) => event(currency));
    }
}

export default UserManager;
