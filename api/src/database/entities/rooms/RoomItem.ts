import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Room from "./Room";
import User from "../users/User";
import Item from "../items/Item";
import SHabbo from "@SHabbo";

@Entity('room_items')
class RoomItem {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Room, (room) => room.id, { nullable: true })
    @JoinColumn({ name: 'room_id' })
    room: Room | null;

    @Column({ nullable: true })
    room_id: number | null;

    @ManyToOne(() => User, (user) => user.id)
    @JoinColumn({ name: 'owner_id' })
    owner: User;

    @Column({ nullable: false })
    owner_id: number;

    @ManyToOne(() => Item, (item) => item.id)
    @JoinColumn({ name: 'item_id' })
    item: Item;

    @Column({ nullable: false })
    item_id: number;

    @Column({ default: 0 })
    x: number;

    @Column({ default: 0 })
    y: number;

    @Column({ default: 0 })
    z: number;

    @Column({ default: 0 })
    rotation: number;

    async save(): Promise<RoomItem> {
        return await SHabbo.getDatabase().getRoomItems().save(this);
    }

    toInterface(): IRoomItem {
        return {
            id: this.id,
            room: this.room?.toInterface() ?? null,
            owner: this.owner.toInterface(),
            item: this.item.toInterface(),
            x: this.x,
            y: this.y,
            z: this.z,
            rotation: this.rotation,
        };
    }
}

export default RoomItem;
