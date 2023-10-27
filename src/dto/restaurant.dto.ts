import { IsDate, IsNotEmpty } from "class-validator";
import { MenuDto } from "./menu.dto";

export class RestaurantDto {
    id: number;

    @IsNotEmpty()
    full_name: string;
    email: string;
    phone_number: number;
    password: string;

    gps: string;
    
    address: string;

    @IsDate()
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;

    menu: MenuDto[];

}