import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Room from '../rooms/Room';

@Entity()
class NavigatorCategory {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => Room, (room) => room.id)
    rooms: Room[];

    toInterface(): INavigatorCategory {
        return {
            ...this,
            rooms: this.rooms.map((room) => room.toInterface()),
        };
    }
}

export default NavigatorCategory;
