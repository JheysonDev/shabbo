import SHabbo from "@SHabbo";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import RoomModel from "../rooms/RoomModel";

@Entity('navigator_rooms')
class NavigatorRoom {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @ManyToOne(() => RoomModel, (room_model) => room_model.id)
    @JoinColumn({ name: 'model_id' })
    model: RoomModel;

    @Column({ nullable: false })
    model_id: number;

    @Column({ default: 1 })
    order: number;

    @Column({ default: 0 })
    cost_credits: number;

    async save(): Promise<NavigatorRoom> {
        return await SHabbo.getDatabase().getNavigatorRooms().save(this);
    }

    toInterface(): INavigatorRoom {
        return {
            id: this.id,
            name: this.name,
            model: this.model.toInterface(),
            order: this.order,
            cost_credits: this.cost_credits,
        };
    }
}

export default NavigatorRoom;
