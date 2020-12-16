import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import Item from "../items/Item";
import CatalogPage from "./CatalogPage";

@Entity('catalog_items')
class CatalogItem {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => CatalogPage)
    @JoinColumn({ name: 'page_id' })
    page: CatalogPage;

    @OneToOne(() => Item)
    @JoinColumn({ name: 'item_id' })
    item: Item;

    @Column({ default: 1 })
    order: number;

    @Column({ default: 5 })
    cost_credits: number;

    @Column({ default: 0 })
    cost_diamonds: number;
}

export default CatalogItem;
