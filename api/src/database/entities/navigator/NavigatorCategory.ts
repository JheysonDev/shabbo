import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('navigator_categories')
class NavigatorCategory {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
}

export default NavigatorCategory;
