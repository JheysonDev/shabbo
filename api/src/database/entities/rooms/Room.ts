import SHabbo from '@SHabbo';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import NavigatorCategory from '../navigator/NavigatorCategory';
import User from '../users/User';
import RoomItem from './RoomItem';
import RoomModel from './RoomModel';

@Entity('rooms')
class Room {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => RoomModel, (room_model) => room_model.id)
    @JoinColumn({ name: 'model_id' })
    model: RoomModel;

    @Column({ nullable: false })
    model_id: number;

    @ManyToOne(() => NavigatorCategory, (navigator_category) => navigator_category.id)
    @JoinColumn({ name: 'category_id' })
    category: NavigatorCategory;

    @Column({ nullable: false })
    category_id: number;

    @ManyToOne(() => User, (user) => user.id)
    @JoinColumn({ name: 'owner_id' })
    owner: User;

    @Column({ nullable: false })
    owner_id: number;

    @OneToMany(() => RoomItem, (room_item) => room_item.id)
    items: RoomItem[];

    @OneToMany(() => User, (user) => user.id)
    last_users: User[];

    async save(): Promise<Room> {
        return await SHabbo.getDatabase().getRooms().save(this);
    }

    toInterface(): IRoom {
        return {
            id: this.id,
            name: this.name,
            model: this.model.toInterface(),
            category: this.category.toInterface(),
            owner: this.owner.toInterface(),

            items: this.items?.map((item) => item.toInterface()) ?? [],
        };
    }
}

export default Room;
