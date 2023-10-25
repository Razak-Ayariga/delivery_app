import { IsDate } from "class-validator";

export class OrderedMenuDto {
    id: number;
    order_id: number;
    restaurant_id: number;
    quantity: number;
    amount: number;

    @IsDate()
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
}