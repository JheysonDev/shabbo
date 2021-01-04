import CatalogPage from "@Database/entities/catalogue/CatalogPage";
import { DeepPartial } from "typeorm";
import LogsManager from "@Logs";
import SHabbo from "@SHabbo";
import * as CatalogueData from "./CatalogueData.json";
import CatalogItem from "@Database/entities/catalogue/CatalogItem";

interface Page {
    parent: DeepPartial<CatalogPage>;
    items?: DeepPartial<CatalogItem>[];
    children?: Page[];
}

class CatalogPagesLoader implements ILoader {
    async beforeRun(): Promise<boolean> {
        const pages = await SHabbo.getDatabase().getCatalogPages().find({ take: 1 });
        return pages.length === 0;
    }

    async run(): Promise<void> {
        const pages: Page[] = CatalogueData.map<Page>((e) => {
            if (e.parent.type) {
                e.parent.type = CatalogPage.getTypeFromString(e.parent.type);
            }

            return e as Page;
        });

        const mapPage = async (page: Page, order: number): Promise<void> => {
            const parent = await SHabbo.getDatabase().getCatalogPages().create({ ...page.parent, order }).save();

            const catalog_items: DeepPartial<CatalogItem>[] = page.items ?? [];
            if (catalog_items.length) {
                let i: number = 1;

                for await (const catalog_item of catalog_items) {
                    const item = await SHabbo.getDatabase().getItems().findOne(catalog_item.id);
                    if (item) {
                        catalog_item.page = parent;
                        catalog_item.item = item;
                        catalog_item.order = i++;

                        await SHabbo.getDatabase().getCatalogItems().create(catalog_item).save();
                    }
                }
            }

            const children: Page[] = page.children ?? [];
            if (children.length) {
                let i: number = 1;

                for await (const child of children) {
                    child.parent.parent = parent;
                    await mapPage(child, i++);
                }
            }
        }

        let i: number = 1;
        for await (const page of pages) {
            await mapPage(page, i++);
        }

        LogsManager.success('Default catalog pages inserted.');
    }
}

export default CatalogPagesLoader;
