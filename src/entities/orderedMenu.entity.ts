import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinColumn, OneToMany } from "typeorm";
import { Order } from "./order.entity";
import { Menu } from "./menu.entity";

@Entity()
export class OrderedMenu {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  order_id: number;

  @Column()
  menu_id: number;

  @Column()
  restaurant_id: number;

  @Column()
  quantity: number;

  @Column()
  amount: number;

  @ManyToOne(() => Menu)
  @JoinColumn({name: "menu_id"})
  menu: Menu;

  @OneToMany(() => OrderedMenu, (orderedMenu) => orderedMenu.order)
  order: Order[];

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @Column()
  updated_at: Date;

  @Column()
  deleted_at: Date;
}
