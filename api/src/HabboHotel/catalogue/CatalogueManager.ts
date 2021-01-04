import CatalogPage from "@Database/entities/catalogue/CatalogPage";
import SHabbo from "@SHabbo";

class CatalogueManager {
    private items: ICatalogItem[];
    private pages: ICatalogPage[];

    constructor() {
        this.items = [];
        this.pages = [];
    }

    async loadItemsByPage(page: ICatalogPage): Promise<ICatalogItem[]> {
        const items: ICatalogItem[] = [];

        const items_db = await SHabbo.getDatabase().getCatalogItems().find({ page_id: page.id });
        if (items_db.length) {
            for await (const item of items_db) {
                const item_cache: ICatalogItem | null = this.items.find((i) => i.id === item.id);
                if (item_cache) {
                    items.push(item_cache);
                    continue;
                }

                const item_int: IItem | null = await SHabbo.getHotel().getItemsManager().loadItemByID(item.id);
                if (item_int) {
                    const catalog_item: ICatalogItem = {
                        id: item.id,
                        page,
                        item: item_int,
                        order: item.order,
                        cost_credits: item.cost_credits,
                        cost_diamonds: item.cost_diamonds,
                    };

                    items.push(catalog_item);
                    this.items.push(catalog_item);
                    continue;
                }
            }
        }

        return items;
    }

    async loadPageByID(page: number | CatalogPage): Promise<ICatalogPage | null> {
        const page_cache = this.pages.find((p) => p.id === (typeof page === 'number' ? page: page.id));
        if (page_cache) {
            return page_cache;
        }

        const page_db: CatalogPage = typeof page !== 'number' ? page : await SHabbo.getDatabase().getCatalogPages().findOne(page);
        if (page_db) {
            const page: ICatalogPage = page_db.toInterface();

            if (page_db.parent_id) {
                const parent = await this.loadPageByID(page_db.parent_id);

                page.parent = parent;
                parent.children.push(page);
            }

            this.pages.push(page);
            return page;
        }

        return null;
    }

    async loadPagesByParentID(parent_id: number | null): Promise<ICatalogPage[]> {
        const pages: ICatalogPage[] = [];

        const pages_db = await SHabbo.getDatabase().getCatalogPages().find({ parent_id });
        if (pages_db.length) {
            for await (const page of pages_db) {
                pages.push(await this.loadPageByID(page));
            }
        }

        return pages;
    }
}

export default CatalogueManager;
