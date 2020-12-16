import PacketComposer from '@Communication/outgoing/PacketComposer';
import IUser, { IUserGender } from '@Interfaces/IUser';
import SHabbo from '@SHabbo';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users')
class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    username: string;

    @Column('enum', { default: IUserGender.Male, enum: Object.values(IUserGender) })
    gender: IUserGender;

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

    toArray(): IUser {
        return {
            id: this.id,
            username: this.username,
            gender: this.gender,
            look: this.look,
            motto: this.motto,
            online: this.online,
            credits: this.credits,
            diamonds: this.diamonds,
        }
    }
}

export default User;
