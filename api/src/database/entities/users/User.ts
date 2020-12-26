import PacketComposer from '@Communication/outgoing/PacketComposer';
import SHabbo from '@SHabbo';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import Room from '../rooms/Room';
import RoomItem from '../rooms/RoomItem';

@Entity()
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

    @OneToOne(() => Room, (room) => room.id, { nullable: true })
    @JoinColumn({ name: 'last_room' })
    last_room: Room | null;

    @OneToMany(() => Room, (room) => room.id)
    rooms: Room[];

    @OneToMany(() => RoomItem, (room_item) => room_item.id)
    items: RoomItem[];

    async sendPacket(packet: PacketComposer): Promise<boolean> {
        const connection = SHabbo.getServer().getCommunication().getConnection(this.id);

        if (!connection) {
            throw new Error('No conenction for user.');
        }

        return await connection.sendPacket(packet);
    }

    async save(): Promise<void> {
        await SHabbo.getDatabase().getUsers().save(this);
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
