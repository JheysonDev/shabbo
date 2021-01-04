import SHabbo from '@SHabbo';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import CatalogItem from '../catalogue/CatalogItem';
import Room from '../rooms/Room';

@Entity('items')
class Item {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @Column({ type: 'enum', enum: ['floor', 'wall'], default: 'floor' })
    type: 'floor' | 'wall';

    @Column({ default: 1 })
    width: number;

    @Column({ default: 1 })
    length: number;

    @Column({ default: 1 })
    height: number;

    @Column({ default: true })
    can_stack: boolean;

    @Column({ default: false })
    can_walk: boolean;

    @Column({ default: false })
    can_sit: boolean;

    @Column({ default: false })
    can_lay: boolean;

    @Column({ default: 1 })
    interaction_count: number;

    @Column({ default: false })
    is_rare: boolean;

    @OneToMany(() => CatalogItem, (catalog_item) => catalog_item.id)
    catalog_items: CatalogItem[];

    @OneToMany(() => Room, (room) => room.id)
    rooms: Room[];

    async save(): Promise<Item> {
        return await SHabbo.getDatabase().getItems().save(this);
    }

    toInterface(): IItem {
        return {
            ...this,
            catalog_items: this.catalog_items.map((catalog_item) => catalog_item.toInterface()),
            rooms: this.rooms.map((room) => room.toInterface()),
        };
    }
}

export default Item;
