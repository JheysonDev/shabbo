import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import RoomModel from "../rooms/RoomModel";

@Entity()
class NavigatorRoom {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @ManyToOne(() => RoomModel, (room_model) => room_model.id)
    model: RoomModel;

    @Column({ default: 1 })
    order: number;

    @Column({ default: 0 })
    cost_credits: number;

    toInterface(): INavigatorRoom {
        return {
            ...this,
            model: this.model.toInterface(),
        };
    }
}

export default NavigatorRoom;
