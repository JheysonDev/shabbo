import Page from "./Page";
import SHabbo from "@SHabbo";

// Client
import ClientPage from "./client/ClientPage";

// Home
import LoginPage from "./home/LoginPage";

// Errors
import ServerDownPage from "./errors/ServerDownPage";

class PagesManager {
    private current_page: Page | null;
    private pages: Map<string, Page>;

    constructor() {
        this.current_page = null;
        this.pages = new Map();

        this._registerPages();
    }

    private _registerPages(): void {
        this._registerClient();
        this._registerHome();
        this._registerErrors();
    }

    private _registerClient(): void {
        this.addPage('client', new ClientPage());
    }

    private _registerHome(): void {
        this.addPage('login', new LoginPage());
    }

    private _registerErrors(): void {
        this.addPage('server_down', new ServerDownPage());
    }

    addPage(name: string, page: Page): boolean {
        if (this.pages.has(name)) {
            return false;
        }

        this.pages.set(name, page);
        return this.pages.has(name);
    }

    private get main_element(): HTMLDivElement | null {
        return document.getElementById('shabbo') as HTMLDivElement;
    }

    async changePage(name: string): Promise<Page | null> {
        if (this.current_page) {
            if (this.main_element) {
                for (const e of this.main_element.children) {
                    this.main_element.removeChild(e);
                }
            }

            this.current_page = null;
        }

        const page = this.pages.get(name);
        if (page && this.main_element) {
            if (!page.beforeBuild()) {
                return null;
            }

            page.buildCSS();
            this.main_element.appendChild(await page.build());

            this.current_page = page;
        }

        return null;
    }

    async run(): Promise<void> {
        const page = document.location.pathname.toLowerCase();

        if (page === '/login') {
            await this.changePage('login');
            return;
        } else if (page === '/client') {
            await this.changePage('client');
            return;
        }

        document.location.href = `/${SHabbo.isLogged() ? 'client' : 'login'}`;
    }
}

export default PagesManager;
