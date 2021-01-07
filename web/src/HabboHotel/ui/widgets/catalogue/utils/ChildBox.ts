import OpenCatalogPageComposer from "@Communication/outgoing/catalogue/OpenCatalogPageComposer";
import CatalogueManager from "@HabboHotel/catalogue/CatalogueManager";
import SHabbo from "@SHabbo";
import { Graphics, RoundedRectangle, Sprite, Text, TextStyle } from "pixi.js";

class ChildBox extends Graphics {
    private page_icon: Sprite;
    private page_name_styles: TextStyle;
    private page_name: Text;
    private page_collapsible: Graphics;
    private page_children: CatalogPages[];

    public mounted: boolean;
    private is_selected: boolean;

    private _on_select: (() => void) | null;
    private _on_unselect: (() => void) | null;
    private _on_children_load: (() => void) | null;

    constructor(
        private page: ICatalogPage,
        private pages_width: number,
        private pages_height: number,
        public level: number = 1,
    ) {
        super();

        this._buildTransparentBox();
        this.page_icon = this._buildPageIcon();
        this.page_name_styles = this._buildPageNameStyles();
        this.page_name = this._buildPageName();
        this.page_collapsible = this._buildPageCollapsible();
        this.page_children = [];

        this.mounted = false;
        this.is_selected = false;

        this._on_select = null;
        this._on_unselect = null;
        this._on_children_load = null;

        this._registerListeners();
        this.toInitialState();
    }

    private _buildTransparentBox(): void {
        this.hitArea = new RoundedRectangle(0, 0, this.pages_width, this.pages_height, 4);

        this.interactive = true;
        this.buttonMode = true;

        this.lineStyle(1, 0x000000, 0)
            .beginFill(0x000000, 0)
            .drawRoundedRect(0, 0, this.pages_width, this.pages_height, 4)
            .endFill();
    }

    private _buildPageIcon(): Sprite {
        const icon = Sprite.from(`${SHabbo.getSetting('images_url')}catalogue_icons/icon_${this.page.icon}.png`);
        this.addChild(icon);

        icon.width = 18;
        icon.height = 18;

        icon.x = this.level * 8;
        icon.y = 4;

        return icon;
    }

    private _buildPageNameStyles(): TextStyle {
        return new TextStyle({
            fontFamily: 'Roboto',
            fontSize: 14,
            fontWeight: '400',
        });
    }

    private _buildPageName(): Text {
        const page_name = new Text(this.page.name, this.page_name_styles);
        this.addChild(page_name);

        page_name.x = this.page_icon.x + this.page_icon.width + 8;
        page_name.y = this.height / 2 - page_name.height / 2;

        return page_name;
    }

    private _buildPageCollapsible(): Graphics {
        const page_collapsible = new Graphics();
        this.addChild(page_collapsible);

        return page_collapsible;
    }

    private async _fetchChildren(): Promise<void> {
        if (this.page.children <= 0) {
            return;
        }

        this.page_children = SHabbo.getHotelManager().getCatalogueManager().getPages(this.page.id);
        if (this.page_children.length !== this.page.children) {
            await SHabbo.getHotelManager().getConnection().sendPacket(new OpenCatalogPageComposer(this.page.id));

            const suscriber = CatalogueManager.update_pages.subscribe((catalog_page) => {
                if (catalog_page.page && catalog_page.page.parent === this.page.id) {
                    this.page_children.push(catalog_page);
                }

                if (this.page_children.length === this.page.children) {
                    suscriber.unsubscribe();

                    if (this._on_children_load) {
                        this._on_children_load();
                    }
                }
            });
        } else if (this._on_children_load) {
            this._on_children_load();
        }
    }

    private _onMouseOver(): void {
        if (this.is_selected) {
            return;
        }

        this.clear()
            .lineStyle(1, 0x9E9E9E, 0.3)
            .beginFill(0x9E9E9E, 0.3)
            .drawRoundedRect(0, 0, this.pages_width, this.pages_height, 4)
            .endFill();

        this.page_icon.alpha = 1;
        this.page_name.alpha = 1;

        if (this.page.children > 0) {
            this.page_collapsible
                .clear()
                .beginFill(0x000000)
                .drawPolygon([ 0, 0, 5, 10 / 2, 0, 10 ])
                .endFill();
        }
    }

    private _onMouseOut(): void {
        if (this.is_selected) {
            return;
        }

        this.toInitialState();
    }

    private async _onClick(): Promise<void> {
        if (this.is_selected) {
            this.toInitialState();

            if (this._on_unselect) {
                this._on_unselect();
            }
        } else {
            this.is_selected = true;

            const colors: number[] = [0x3F51B5, 0x3F51B5, 0x5C6BC0, 0x7986CB];
            this.clear()
                .lineStyle(1, colors[this.level] || colors[0])
                .beginFill(colors[this.level] || colors[0])
                .drawRoundedRect(0, 0, this.pages_width, this.pages_height, 4)
                .endFill();

            this.page_icon.alpha = 1;
            this.page_name.alpha = 1;
            this.page_name_styles.fill = ['#FFFFFF'];

            if (this.page.children > 0) {
                this.page_collapsible
                    .clear()
                    .beginFill(0xFFFFFF)
                    .drawPolygon([ 0, 0, 10, 0, 5, 5, 0, 0 ])
                    .endFill();

                this.page_collapsible.x = this.width - this.page_collapsible.width - 8;
                this.page_collapsible.y = this.height / 2 - this.page_collapsible.height / 2;

                await this._fetchChildren();
            } else if (this._on_children_load) {
                this._on_children_load();
            }

            if (this._on_select) {
                this._on_select();
            }
        }
    }

    private _registerListeners(): void {
        this.addListener('mouseover', () => this._onMouseOver());
        this.addListener('mouseout', () => this._onMouseOut());
        this.addListener('click', () => this._onClick());
    }

    toInitialState(): void {
        this.is_selected = false;

        this.clear()
            .lineStyle(1, 0x9E9E9E, this.level === 1 ? 1 : 0)
            .beginFill(0x000000, 0)
            .drawRoundedRect(0, 0, this.pages_width, this.pages_height, 4)
            .endFill();

        this.page_icon.alpha = 0.75;
        this.page_name_styles.fill = ['#000000'];
        this.page_name.alpha = 0.75;

        if (this.page.children > 0) {
            this.page_collapsible
                .clear()
                .beginFill(0x000000, 0.5)
                .drawPolygon([ 0, 0, 5, 10 / 2, 0, 10 ])
                .endFill();

            this.page_collapsible.x = this.width - this.page_collapsible.width - 8;
            this.page_collapsible.y = this.height / 2 - this.page_collapsible.height / 2;
        }
    }

    getPageID(): number {
        return this.page.id;
    }

    getParentID(): number {
        return this.page.parent;
    }

    getPageChildren(): CatalogPages[] {
        return this.page_children;
    }

    async select(): Promise<void> {
        await this._onClick();
    }

    set onSelect(event: (() => void) | null) {
        this._on_select = event;
    }

    set onUnSelect(event: (() => void) | null) {
        this._on_unselect = event;
    }

    set onChildrenLoad(event: (() => void) | null) {
        this._on_children_load = event;
    }

    destroy(): void {
        this.page_icon.destroy();
        this.page_icon = new Sprite();

        this.page_name_styles = new TextStyle();

        this.page_name.destroy();
        this.page_name = new Text('');

        this.page_collapsible.destroy();
        this.page_collapsible = new Graphics();

        this.page_children = [];

        this.mounted = false;
        this.is_selected = false;

        this._on_select = null;
        this._on_unselect = null;
        this._on_children_load = null;

        this.removeAllListeners();

        if (this.parent) {
            this.parent.removeChild(this);
        }
    }
}

export default ChildBox;
