import Habbo from '@HabboHotel/users/Habbo';
import SHabbo from '@SHabbo';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import Room from '../rooms/Room';
import RoomItem from '../rooms/RoomItem';

@Entity('users')
class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    username: string;

    @Column('enum', { default: 'M', enum: ['M', 'F'] })
    gender: 'M' | 'F';

    @Column({ default: 'hd-180-1.hr-100-61.ch-210-66.lg-280-110.sh-305-62' })
    look: string;

    @Column({ default: 'SHabbo!' })
    motto: string;

    @Column({ default: false })
    online: boolean;

    @Column({ default: 2500 })
    credits: number;

    @Column({ default: 10 })
    diamonds: number;

    @ManyToOne(() => Room, (room) => room.id, { nullable: true })
    last_room: Room | null;

    @OneToMany(() => Room, (room) => room.id)
    rooms: Room[];

    @OneToMany(() => RoomItem, (room_item) => room_item.id)
    items: RoomItem[];

    private _habbo: Habbo | null = null;

    getHabbo(): Habbo {
        if (!this._habbo) {
            this._habbo = new Habbo(this);
        }

        return this._habbo;
    }

    async save(): Promise<User> {
        return await SHabbo.getDatabase().getUsers().save(this);
    }

    toInterface(): IUser {
        return {
            ...this,
            last_room: this.last_room ? this.last_room.toInterface() : null,

            rooms: this.rooms.map((room) => room.toInterface()),
            items: this.items.map((item) => item.toInterface()),
        };
    }
}

export default User;
