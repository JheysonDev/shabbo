import OpenCatalogPageComposer from "@Communication/outgoing/catalogue/OpenCatalogPageComposer";
import CatalogueManager from "@HabboHotel/catalogue/CatalogueManager";
import SHabbo from "@SHabbo";
import { Container } from "pixi.js";
import TextInput from "../forms/TextInput";
import ScrollContainer from "../utils/ScrollContainer";
import ChildBox from "./utils/ChildBox";

class DefaultTopLayout extends Container {
    private max_width: number;
    private max_height: number;

    private pages_width: number;
    private pages_height: number;

    private search: Container;
    private pages_box: ScrollContainer;

    private can_choose: boolean;
    private page_active: (ChildBox | null)[];
    private pages_actives: ChildBox[];

    constructor(
        private top_page: CatalogPages,
        width_container: number,
        height_container: number,
    ) {
        super();

        this.max_width = width_container - 16;
        this.max_height = height_container - 12;

        this.pages_width = ~~(this.max_width * 0.35);
        this.pages_height = 26;

        this.search = this._buildSearch();
        this.pages_box = this._buildPagesBox();

        this.can_choose = false;
        this.page_active = [];
        this.pages_actives = [];

        this._fetchChildren();
    }

    private _buildSearch(): Container {
        const text_input = new TextInput(
            'Search in the catalogue...',
            {
                width: this.pages_width,
                radius: 4,
                font_size: 14,
            }
        );

        this.addChild(text_input);
        return text_input;
    }

    private _buildPagesBox(): ScrollContainer {
        const search_height = this.search.y + this.search.height + 4;
        const max_height = this.pages_height * 16 + 4 * 15;

        const scroll_box = new ScrollContainer(this.pages_width, max_height);
        const scroll_main = scroll_box.getMain();

        this.addChild(scroll_main);

        scroll_main.y = search_height;

        return scroll_box;
    }

    private async _updateChildren(): Promise<void> {
        let i: number = 0;
        for await (const child of this.pages_actives) {
            if (!child.mounted) {
                child.mounted = true;
                this.pages_box.addChild(child);
            }

            if (i !== 0) {
                const last_page = this.pages_actives[i - 1];
                if (last_page) {
                    child.y = last_page.y + last_page.height + 4;
                }
            } else {
                if (this.page_active[child.level] == null && child.level === 1 && this.can_choose) {
                    this.can_choose = false;
                    await child.select();
                }
            }

            i++;
        }

        this.pages_box.updateScrollPosition();
    }

    private _slicePages(start: number, end: number, level: number): ChildBox[] {
        const pages: ChildBox[] = [];

        for (let i = start; i < end; i++) {
            const page = this.pages_actives[i];
            if (!page) {
                continue;
            }

            if (page.level > level) {
                page.destroy();
                continue;
            }

            pages.push(page);
        }

        return pages;
    }

    private async _buildChildren(children: CatalogPages[], level: number): Promise<ChildBox[]> {
        const children_boxes: ChildBox[] = [];

        for (const child of children) {
            if (!child.page) {
                continue;
            }

            const child_box = new ChildBox(child.page, this.pages_width, this.pages_height, level);

            child_box.onSelect = () => {
                const current_page = this.page_active[level];
                if (current_page) {
                    current_page.toInitialState();
                }

                this.page_active[level] = child_box;
            };

            child_box.onUnSelect = async () => {
                this.page_active[level] = null;

                const parent_index = this.pages_actives.findIndex((child) => child.getPageID() === child_box.getPageID());
                if (parent_index >= 0) {
                    const no_update = this._slicePages(0, parent_index + 1, level);
                    const to_update = this._slicePages(parent_index + 1, this.pages_actives.length, level);

                    this.pages_actives = no_update.concat(to_update);
                    await this._updateChildren();
                }
            };

            child_box.onChildrenLoad = async () => {
                const subchildren = await this._buildChildren(child_box.getPageChildren(), level + 1);

                const parent_index = this.pages_actives.findIndex((child) => child.getPageID() === child_box.getPageID());
                if (parent_index >= 0) {
                    const no_update = this._slicePages(0, parent_index + 1, level);
                    const to_update = this._slicePages(parent_index + 1, this.pages_actives.length, level);

                    this.pages_actives = no_update.concat(subchildren.concat(to_update));
                    await this._updateChildren();
                }
            };

            children_boxes.push(child_box);
        }

        return children_boxes;
    }

    private async _onChildrenFetch(): Promise<void> {
        this.pages_actives = this.pages_actives.concat(await this._buildChildren(this.top_page.children, 1));
        this.can_choose = true;

        await this._updateChildren();
    }

    private async _fetchChildren(): Promise<void> {
        if (!this.top_page.page || this.top_page.page.children === 0) {
            return;
        }

        const children_count = this.top_page.page.children;

        const children = SHabbo.getHotelManager().getCatalogueManager().getPages(this.top_page.page.id);
        if (children.length !== children_count) {
            await SHabbo.getHotelManager().getConnection().sendPacket(new OpenCatalogPageComposer(this.top_page.page.id));

            const suscriber = CatalogueManager.update_pages.subscribe(async (catalog_page) => {
                if (catalog_page.page && this.top_page.page && catalog_page.page.parent === this.top_page.page.id) {
                    children.push(catalog_page);
                }

                if (children.length === children_count) {
                    this.top_page.children = children;
                    suscriber.unsubscribe();

                    await this._onChildrenFetch();
                }
            });
        } else {
            await this._onChildrenFetch();
        }
    }

    destroy(): void {
        this.search.destroy();
        this.search = new Container();

        this.pages_box.destroy();

        this.page_active = [];

        this.pages_actives.forEach((page) => page.destroy());
        this.pages_actives = [];

        if (this.parent) {
            this.parent.removeChild(this);
        }
    }
}

export default DefaultTopLayout;
