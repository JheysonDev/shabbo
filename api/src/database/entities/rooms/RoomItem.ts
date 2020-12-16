import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import Room from "./Room";
import User from "../users/User";
import Item from "../items/Item";

@Entity('room_items')
class RoomItem {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => Room, { nullable: true })
    @JoinColumn({ name: 'room_id' })
    room: Room | null;

    @OneToOne(() => User)
    @JoinColumn({ name: 'owner_id' })
    owner: User;

    @OneToOne(() => Item)
    @JoinColumn({ name: 'item_id'})
    item: Item;

    @Column({ default: 0 })
    x: number;

    @Column({ default: 0 })
    y: number;

    @Column({ default: 0 })
    z: number;

    @Column({ default: 0 })
    rotation: number;
}

export default RoomItem;
