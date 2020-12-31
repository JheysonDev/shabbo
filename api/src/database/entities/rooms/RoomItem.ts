import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Room from "./Room";
import User from "../users/User";
import Item from "../items/Item";
import SHabbo from "@SHabbo";

@Entity('room_items')
class RoomItem {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Room, (room) => room.id, { nullable: true })
    room: Room | null;

    @ManyToOne(() => User, (user) => user.id)
    owner: User;

    @ManyToOne(() => Item, (item) => item.id)
    item: Item;

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
            ...this,
            room: this.room ? this.room.toInterface() : null,
            owner: this.owner.toInterface(),
            item: this.item.toInterface(),
        };
    }
}

export default RoomItem;
