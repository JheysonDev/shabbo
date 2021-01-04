import SHabbo from "@SHabbo";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import CatalogItem from "./CatalogItem";

export enum CatalogPageType {
    Default = 'default',
    Frontpage = 'frontpage',
}

@Entity('catalog_pages')
class CatalogPage {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ type: 'enum', enum: Object.values(CatalogPageType), default: CatalogPageType.Default })
    type: CatalogPageType;

    @ManyToOne(() => CatalogPage, (catalog_page) => catalog_page.id, { nullable: true })
    @JoinColumn({ name: 'parent_id' })
    parent: CatalogPage | null;

    @Column({ nullable: true })
    parent_id: number | null;

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
            id: this.id,
            name: this.name,
            type: this.type,
            parent: this.parent?.toInterface() ?? null,
            order: this.order,
            icon: this.icon,

            children: this.children?.map((child) => child.toInterface()) ?? [],
            catalog_items: this.catalog_items?.map((catalog_item) => catalog_item.toInterface()) ?? [],
        };
    }

    static getTypeFromString(text: string): CatalogPageType {
        switch (text) {
            case 'frontpage': return CatalogPageType.Frontpage;
            default: return CatalogPageType.Default;
        }
    }
}

export default CatalogPage;
