import { IsDate } from "class-validator";
import { OrderedMenuDto } from "./orderedMenu.dto";

export class OrderDto  {
    id: number;
    restaurant_id: number;
    customer_id: number;
    delivery_point: string;
    status: string;

    @IsDate()
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;

    ordered_menus: OrderedMenuDto[];
}