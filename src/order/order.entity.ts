import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Order')
export class Order {
    @PrimaryGeneratedColumn() id:string;
}
