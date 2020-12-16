import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import RoomModel from "../rooms/RoomModel";

@Entity('navigator_rooms')
class NavigatorRoom {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => RoomModel)
    @JoinColumn({ name: 'model_id' })
    model: RoomModel;

    @Column({ default: 1 })
    order: number;

    @Column({ default: 0 })
    cost_credits: number;
}

export default NavigatorRoom;
