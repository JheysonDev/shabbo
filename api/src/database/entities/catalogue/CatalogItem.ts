import SHabbo from "@SHabbo";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Item from "../items/Item";
import CatalogPage from "./CatalogPage";

@Entity('catalog_items')
class CatalogItem {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => CatalogPage, (catalog_page) => catalog_page.id)
    page: CatalogPage;

    @ManyToOne(() => Item, (item) => item.id)
    item: Item;

    @Column({ default: 1 })
    order: number;

    @Column({ default: 5 })
    cost_credits: number;

    @Column({ default: 0 })
    cost_diamonds: number;

    async save(): Promise<CatalogItem> {
        return await SHabbo.getDatabase().getCatalogItems().save(this);
    }

    toInterface(): ICatalogItem {
        return {
            ...this,
            page: this.page.toInterface(),
            item: this.item.toInterface(),
        };
    }
}

export default CatalogItem;
