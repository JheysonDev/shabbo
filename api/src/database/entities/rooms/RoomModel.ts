import SHabbo from '@SHabbo';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import NavigatorRoom from '../navigator/NavigatorRoom';
import Room from './Room';

@Entity()
class RoomModel {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'longtext' })
    floor: string;

    @Column({ default: '0;0;0;2' })
    door: string;

    @OneToMany(() => Room, (room) => room.id)
    rooms: Room[];

    @OneToMany(() => NavigatorRoom, (navigator_room) => navigator_room.id)
    navigator_rooms: NavigatorRoom[];

    async save(): Promise<RoomModel> {
        this.floor = this.floor.trim().split('\n').map((line) => line.trim()).join('\n');

        return await SHabbo.getDatabase().getRoomModels().save(this);
    }

    getDoorPoint(): Point {
        const [x, y, z, rotation] = this.door.split(';').map(Number);
        return { x, y, z, rotation };
    }

    toInterface(): IRoomModel {
        return {
            ...this,
            door: this.getDoorPoint(),

            rooms: this.rooms.map((room) => room.toInterface()),
            navigator_rooms: this.navigator_rooms.map((navigator_room) => navigator_room.toInterface()),
        };
    }
}

export default RoomModel;
