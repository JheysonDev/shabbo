import IRoomModel from '@Interfaces/IRoomModel';
import SHabbo from '@SHabbo';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('room_models')
class RoomModel {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: '00\n00' })
    floor: string;

    @Column({ default: '0;0;0' })
    door: string;

    async save(): Promise<void> {
        await SHabbo.getDatabase().getRoomModels().save(this);
    }

    toArray(): IRoomModel {
        const door_coords: number[] = this.door.split(';').map((s) => Number(s));

        return {
            id: this.id,
            floor: this.floor,
            door: { x: door_coords[0], y: door_coords[1], z: door_coords[2] }
        };
    }
}

export default RoomModel;
