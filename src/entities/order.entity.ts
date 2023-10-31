import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn} from "typeorm";
import { Restaurant } from "./restaurant.entity";
import { Customer } from "./customer.entity";
import { OrderedMenu } from "./orderedMenu.entity";
@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  order_code: string;

  @Column()
  customer_id: number;

  @Column()
  restaurant_id: number;

  @Column()
  delivery_point: string;

  @Column()
  total_amount: string;

  @Column()
  status: string;

  @ManyToOne(() => Restaurant)
  @JoinColumn({ name: "restaurant_id" })
  restaurant: Restaurant;

  @ManyToOne(() => Customer)
  @JoinColumn({ name: "customer_id" })
  customer: Customer;

  @OneToMany(() => OrderedMenu, (orderedMenu) => orderedMenu.order)
  orderedMenus: OrderedMenu[];

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @Column()
  updated_at: Date;

  @Column()
  deleted_at: Date;
}



