import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('catalog_pages')
class CatalogPage {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToOne(() => CatalogPage, { nullable: true })
    @JoinColumn({ name: 'parent_id' })
    parent: CatalogPage | null;

    @Column({ default: 1 })
    order: number;
}

export default CatalogPage;
