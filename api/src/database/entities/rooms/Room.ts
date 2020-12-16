import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import NavigatorCategory from '../navigator/NavigatorCategory';
import User from '../users/User';
import RoomModel from './RoomModel';

@Entity('rooms')
class Room {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToOne(() => RoomModel)
    @JoinColumn({ name: 'model_id' })
    model: RoomModel;

    @OneToOne(() => NavigatorCategory)
    @JoinColumn({ name: 'category_id' })
    category: NavigatorCategory;

    @OneToOne(() => User)
    @JoinColumn({ name: 'owner_id' })
    owner: User;
}

export default Room;
