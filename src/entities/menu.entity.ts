import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Restaurant } from "./restaurant.entity";
import { OrderedMenu } from "./orderedMenu.entity";

// Menu Entity

@Entity()
export class Menu {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  restaurant_id: number;

  @Column()
  name: string;

  @Column()
  photo: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @ManyToOne(() => Restaurant)
  @JoinColumn({ name: "restaurant_id" })
  restaurant: Restaurant;

  @OneToMany(() => OrderedMenu, orderedMenu => orderedMenu.menu) // Inverse relationship
  orderedMenus: OrderedMenu[];

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @Column()
  updated_at: Date;

  @Column()
  deleted_at: Date;
}
