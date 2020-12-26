import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import NavigatorCategory from '../navigator/NavigatorCategory';
import User from '../users/User';
import RoomItem from './RoomItem';
import RoomModel from './RoomModel';

@Entity()
class Room {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => RoomModel, (room_model) => room_model.id)
    model: RoomModel;

    @ManyToOne(() => NavigatorCategory, (navigator_category) => navigator_category.id)
    category: NavigatorCategory;

    @ManyToOne(() => User, (user) => user.id)
    owner: User;

    @OneToMany(() => RoomItem, (room_item) => room_item.id)
    items: RoomItem[];

    toInterface(): IRoom {
        return {
            ...this,
            model: this.model.toInterface(),
            category: this.category.toInterface(),
            owner: this.owner.toInterface(),

            items: this.items.map((item) => item.toInterface()),
        };
    }
}

export default Room;
