import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import CatalogItem from '../catalogue/CatalogItem';
import Room from '../rooms/Room';

@Entity()
class Item {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ default: 1 })
    width: number;

    @Column({ default: 1 })
    length: number;

    @Column({ default: 0 })
    height: number;

    @Column({ default: true })
    can_walk: boolean;

    @Column({ default: false })
    can_sit: boolean;

    @Column({ default: false })
    can_lay: boolean;

    @Column({ default: 1 })
    interaction_count: number;

    @OneToMany(() => CatalogItem, (catalog_item) => catalog_item.id)
    catalog_items: CatalogItem[];

    @OneToMany(() => Room, (room) => room.id)
    rooms: Room[];

    toInterface(): IItem {
        return {
            ...this,
            catalog_items: this.catalog_items.map((catalog_item) => catalog_item.toInterface()),
            rooms: this.rooms.map((room) => room.toInterface()),
        };
    }
}

export default Item;
