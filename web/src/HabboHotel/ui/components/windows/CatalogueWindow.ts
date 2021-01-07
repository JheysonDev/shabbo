import OpenCatalogPageComposer from "@Communication/outgoing/catalogue/OpenCatalogPageComposer";
import CatalogueManager from "@HabboHotel/catalogue/CatalogueManager";
import DefaultTopLayout from "@HabboHotel/ui/widgets/catalogue/DefaultTopLayout";
import WindowContainer from "@HabboHotel/ui/widgets/WindowContainer";
import SHabbo from "@SHabbo";
import { Container, Graphics, RoundedRectangle, Text, TextStyle } from "pixi.js";
import { Subject } from "rxjs";
import Component from "../Component";

class CatalogueWindow extends Component {
    private get _width(): number {
        return this.screenWidth * 0.6;
    }

    private get _height(): number {
        return this.screenHeight * 0.9;
    }

    private _top_pages_container: Container = new Container();
    private _top_pages: CatalogPages[] = [];
    private _top_pages_actives: Graphics[] = [];

    private _top_page_selected: Subject<[Graphics, TextStyle]> = new Subject();
    private _top_page_selected_id: number = 0;

    private _layout: Container | null = null;

    private async _onTopPageClick(
        page_box: Graphics,
        width: number,
        height: number,
        title_styles: TextStyle,
        top_page: CatalogPages
    ): Promise<void> {
        if (!top_page.page) {
            return;
        }

        if (this._layout) {
            this._layout.destroy();
        }

        page_box.clear()
            .beginFill(0x3F51B5)
            .drawRoundedRect(0, 0, width, height, 4)
            .endFill();

        title_styles.fill = ['#FFFFFF'];

        this._top_page_selected.next([page_box, title_styles]);
        this._top_page_selected_id = top_page.page.id;

        if (top_page.page.type === 'default') {
            const y = this._top_pages_container.y + this._top_pages_container.height + 12;
            this._layout = new DefaultTopLayout(top_page, 8, y, this._width, this._height);
            this.addChild(this._layout);
        }
    }

    private async _onTopPagesUpdate(): Promise<void> {
        let current_state: [Graphics, TextStyle];
        let i: number = 0;

        this._top_page_selected.subscribe((state) => {
            if (current_state) {
                const [current_box, current_styles] = current_state;

                current_box.clear();
                current_styles.fill = ['#000000'];
            }

            current_state = state;
        });

        for (const top_page of this._top_pages) {
            if (!top_page.page || this._top_pages_actives[i] != null) {
                i++;
                continue;
            }

            const title_styles = new TextStyle({
                fontFamily: 'Roboto',
                fontSize: 16,
                fontWeight: '400',
            });

            const title_page = new Text(top_page.page.name, title_styles);

            title_page.x = 8;
            title_page.y = 4;

            const width = title_page.width + title_page.x * 2;
            const height = title_page.height + title_page.y * 2;

            const page_box = new Graphics();
            this._top_pages_container.addChild(page_box);

            page_box.hitArea = new RoundedRectangle(0, 0, width, height, 4);
            page_box.interactive = true;
            page_box.buttonMode = true;

            page_box.addListener('mouseover', () => {
                if (this._top_page_selected_id === top_page.page?.id) {
                    return;
                }

                page_box.clear();
                page_box.beginFill(0x9E9E9E, 0.25);
                page_box.drawRoundedRect(0, 0, width, height, 4);
                page_box.endFill();

                title_styles.fill = ['#000000'];
            });

            page_box.addListener('mouseout', () => {
                if (this._top_page_selected_id === top_page.page?.id) {
                    return;
                }

                page_box.clear();
            });

            page_box.addListener('click', async () => await this._onTopPageClick(page_box, width, height, title_styles, top_page));

            page_box.beginFill(0x000000, 0);
            page_box.drawRoundedRect(0, 0, width, height, 4);
            page_box.endFill();

            if (i !== 0) {
                const last_page = this._top_pages_actives[i - 1];
                if (last_page) {
                    page_box.x = last_page.x + last_page.width + 12;
                }
            } else if (this._top_page_selected_id === 0) {
                await this._onTopPageClick(page_box, width, height, title_styles, top_page)
            }

            page_box.addChild(title_page);

            this._top_pages_actives[i++] = page_box;
        }

        this._top_pages_container.x = this.container.width / 2 - this._top_pages_container.width / 2;
    }

    async build(): Promise<void> {
        const window = new WindowContainer('Catalogue', this._width, this._height);
        this.container = window;

        window.onClose = async () => await this.dispose();

        this._top_pages = SHabbo.getHotelManager().getCatalogueManager().getPages(0);
        if (!this._top_pages.length) {
            await SHabbo.getHotelManager().getConnection().sendPacket(new OpenCatalogPageComposer(0));

            const suscriber = CatalogueManager.update_pages.subscribe(async (catalog_page) => {
                if (catalog_page.page && catalog_page.page.parent === 0) {
                    this._top_pages.push(catalog_page);
                    this._top_pages.sort((a, b) => (a.page?.order ?? 0) - (b.page?.order ?? 0));
                    await this._onTopPagesUpdate();
                } else {
                    suscriber.unsubscribe();
                }
            });
        } else {
            await this._onTopPagesUpdate();
        }

        this.setActive(true);
        this.container.zIndex = 2;

        this.addChild(this._top_pages_container);
        this._top_pages_container.y = window.title_height;

        this.container.x = ~~(this.screenWidth / 2 - this.container.width / 2);
        this.container.y = ~~(this.screenHeight / 2 - this.container.height / 2);

        this.addToMain();
    }

    async dispose(): Promise<void> {
        this._top_pages_container.destroy();
        this._top_pages_container = new Container();

        this._top_pages = [];
        this._top_pages_actives.forEach((page) => page.destroy());
        this._top_pages_actives = [];

        this._top_page_selected.complete();
        this._top_page_selected.unsubscribe();
        this._top_page_selected = new Subject();
        this._top_page_selected_id = 0;

        if (this._layout) {
            this._layout.destroy();
            this._layout = null;
        }

        this.container.destroy();
        this.container = new Container();

        this.setActive(false);
    }
}

export default CatalogueWindow;
