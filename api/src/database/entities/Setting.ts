import SHabbo from '@SHabbo';
import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('settings')
class Setting {
    @PrimaryColumn()
    key: string;

    @Column()
    value: string;

    async save(): Promise<Setting> {
        return await SHabbo.getDatabase().getSettings().save(this);
    }

    toInterface(): ISetting {
        return this;
    }
}

export default Setting;
