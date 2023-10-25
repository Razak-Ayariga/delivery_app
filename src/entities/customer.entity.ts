import { Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import { Order } from "./order.entity";

@Entity()
export class Customer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    full_name: string;

    @Column()
    email: string;

    @Column()
    phone_number: string;

    @Column()
    password: string;

    @Column()
    gender: string;

    @Column({default: ()=> "CURRENT_TIMESTAMP"})
    created_at: Date;

    @Column()
    updated_at: Date;

    @Column()
    deleted_at: Date;

    @OneToMany(() => Customer, (customer) => customer.orders)
    orders: Order[]
}