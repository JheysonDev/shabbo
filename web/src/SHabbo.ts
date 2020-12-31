import HotelManager from "@HabboHotel/HotelManager";
import PagesManager from "@Pages/PagesManager";
import Axios from "axios";

class SHabbo {
    private static settings: Settings = {};

    private static pages: PagesManager;
    private static hotel: HotelManager;

    async run(): Promise<void> {
        try {
            const response = await Axios.get<Settings>(`${SHabbo.API_URL}settings/all`);
            SHabbo.setSettings(response.data);

            SHabbo.getPagesManager().run();
            document.title = SHabbo.getSetting('hotel_name', 'SHabbo');
        } catch (e) {
            SHabbo.getPagesManager().changePage('server_down');
            document.title = 'SHabbo || Server Down';

            console.error(e);
        }
    }

    static setSettings(settings: Settings): void {
        this.settings = settings;
    }

    static getSetting(name: string, default_value: string = ''): string {
        return this.settings[name] || default_value;
    }

    static getPagesManager(): PagesManager {
        if (!this.pages) {
            this.pages = new PagesManager();
        }

        return this.pages;
    }

    static getHotelManager(): HotelManager {
        return this.hotel;
    }

    static setHotelManager(): void {
        this.hotel = new HotelManager();
    }

    static get API_URL(): string {
        return process.env.API_URL || 'http://localhost:5000/';
    }

    static get USER_ID(): number {
        return Number(localStorage.getItem('user_id') || '0');
    }

    static isLogged(): boolean {
        return this.USER_ID !== 0;
    }
}

export default SHabbo;
