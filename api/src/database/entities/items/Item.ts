import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('items')
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
}

export default Item;
