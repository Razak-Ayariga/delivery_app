import { IsNotEmpty, IsDate } from "class-validator";

export class MenuDto {
    id: number;

    @IsNotEmpty()
    restaurant_id: number;
    name: string;
    price: number;
    
    description: string;
    @IsDate()
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
}