import {Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Menu } from "./menu.entity";
import { Order } from "./order.entity";
import { OrderedMenu } from "./orderedMenu.entity";

@Entity()
export class Restaurant {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    full_name: string;

    @Column()
    email: string;

    @Column()
    phone_number: number;

    @Column()
    password: string;

    @Column()
    gps: string;

    @Column()
    address: string;

    @Column({default:()=> "CURRENT_TIMESTAMP"})
    created_at: Date;

    @Column()
    updated_at: Date;

    @Column()
    deleted_at: Date;

    @OneToMany(() => Restaurant, (restaurant) => restaurant.menus)
    menus: Menu[];

    @OneToMany(()=> Restaurant, (restaurant) => restaurant.orders)
    orders: Order[];

    @OneToMany(() => Restaurant, (restaurant) => restaurant.orderedMenus)
    orderedMenus: OrderedMenu[]
}
