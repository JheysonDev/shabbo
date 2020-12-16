import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('settings')
class Setting {
    @PrimaryColumn()
    key: string;

    @Column()
    value: string;
}

export default Setting;
