import SHabbo from '@SHabbo';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Room from '../rooms/Room';

@Entity('navigator_categories')
class NavigatorCategory {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => Room, (room) => room.id)
    rooms: Room[];

    async save(): Promise<NavigatorCategory> {
        return await SHabbo.getDatabase().getNavigatorCategory().save(this);
    }

    toInterface(): INavigatorCategory {
        return {
            id: this.id,
            name: this.name,

            rooms: this.rooms?.map((room) => room.toInterface()) ?? [],
        };
    }
}

export default NavigatorCategory;
