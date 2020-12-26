import SHabbo from '@SHabbo';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import NavigatorRoom from '../navigator/NavigatorRoom';
import Room from './Room';

@Entity()
class RoomModel {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: '00\n00' })
    floor: string;

    @Column({ default: '0;0;0' })
    door: string;

    @OneToMany(() => Room, (room) => room.id)
    rooms: Room[];

    @OneToMany(() => NavigatorRoom, (navigator_room) => navigator_room.id)
    navigator_rooms: NavigatorRoom[];

    async save(): Promise<void> {
        await SHabbo.getDatabase().getRoomModels().save(this);
    }

    toInterface(): IRoomModel {
        const [doorX, doorY, doorZ] = this.door.split(';').map(Number);

        return {
            ...this,
            door: {
                x: doorX,
                y: doorY,
                z: doorZ,
            },

            rooms: this.rooms.map((room) => room.toInterface()),
            navigator_rooms: this.navigator_rooms.map((navigator_room) => navigator_room.toInterface()),
        };
    }
}

export default RoomModel;
