import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Food')
export class Food {
    @PrimaryGeneratedColumn() id:string;
}
