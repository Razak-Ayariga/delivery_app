import { IsDate, IsNotEmpty } from "class-validator";
import { OrderedMenuDto } from "./orderedMenu.dto";

export class OrderDto  {
    @IsNotEmpty()
    id: number;
    order_code: string;
    restaurant_id: number;
    customer_id: number;
    delivery_point: string;
    status: string;
    total_amount: string;

    @IsDate()
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;

    ordered_menus: OrderedMenuDto[];
}