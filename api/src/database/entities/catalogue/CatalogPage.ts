import SHabbo from "@SHabbo";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import CatalogItem from "./CatalogItem";

@Entity('catalog_pages')
class CatalogPage {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => CatalogPage, (catalog_page) => catalog_page.id, { nullable: true })
    parent: CatalogPage | null;

    @Column({ default: 1 })
    order: number;

    @Column({ default: 1 })
    icon: number;

    @OneToMany(() => CatalogPage, (catalog_page) => catalog_page.id)
    children: CatalogPage[];

    @OneToMany(() => CatalogItem, (catalog_item) => catalog_item.id)
    catalog_items: CatalogItem[];

    async save(): Promise<CatalogPage> {
        return await SHabbo.getDatabase().getCatalogPages().save(this);
    }

    toInterface(): ICatalogPage {
        return {
            ...this,
            parent: this.parent.toInterface(),

            children: this.children.map((child) => child.toInterface()),
            catalog_items: this.catalog_items.map((catalog_item) => catalog_item.toInterface()),
        };
    }
}

export default CatalogPage;
