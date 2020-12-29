import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('settings')
class Setting {
    @PrimaryColumn()
    key: string;

    @Column()
    value: string;

    toInterface(): ISetting {
        return this;
    }
}

export default Setting;
