import { Subject } from "rxjs";

class CatalogueManager {
    private pages: ICatalogPage[];

    constructor() {
        this.pages = [];
    }

    getPage(id: number): CatalogPages {
        return {
            page: this.pages.find((page) => page.id === id) || null,
            children: this.pages.filter((page) => page.parent === id).map((page) => this.getPage(page.id)),
        };
    }

    getPages(parent_id: number): CatalogPages[] {
        return this.pages.filter((page) => page.parent === parent_id).map((page) => this.getPage(page.id));
    }

    hasPage(id: number): boolean {
        return this.pages.find((page) => page.id === id) != null;
    }

    static update_pages: Subject<CatalogPages> = new Subject();

    addPage(page: ICatalogPage): boolean {
        if (this.hasPage(page.id)) {
            return false;
        }

        this.pages.push(page);

        CatalogueManager.update_pages.next(this.getPage(page.id));

        return this.hasPage(page.id);
    }

    static toCatalogPageType(type: string): CatalogPageType {
        switch (type) {
            case 'frontpage': return 'frontpage';
            default: return 'default';
        }
    }
}

export default CatalogueManager;
