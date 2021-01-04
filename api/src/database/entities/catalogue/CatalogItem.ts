import SHabbo from "@SHabbo";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Item from "../items/Item";
import CatalogPage from "./CatalogPage";

@Entity('catalog_items')
class CatalogItem {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => CatalogPage, (catalog_page) => catalog_page.id)
    @JoinColumn({ name: 'page_id' })
    page: CatalogPage;

    @Column({ nullable: false })
    page_id: number;

    @ManyToOne(() => Item, (item) => item.id)
    @JoinColumn({ name: 'item_id' })
    item: Item;

    @Column({ nullable: false })
    item_id: number;

    @Column({ default: 1 })
    order: number;

    @Column({ default: 0 })
    cost_credits: number;

    @Column({ default: 0 })
    cost_diamonds: number;

    async save(): Promise<CatalogItem> {
        return await SHabbo.getDatabase().getCatalogItems().save(this);
    }

    toInterface(): ICatalogItem {
        return {
            id: this.id,
            page: this.page.toInterface(),
            item: this.item.toInterface(),
            order: this.order,
            cost_credits: this.cost_credits,
            cost_diamonds: this.cost_diamonds,
        };
    }
}

export default CatalogItem;
