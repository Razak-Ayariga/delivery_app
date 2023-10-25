import { IsNotEmpty, IsDate } from "class-validator";

export class CustomerDto {
    id: number;

    @IsNotEmpty()
    full_name: string;
    email: string;
    password: string;
    phone_number: string;
    gender: string;

    @IsDate()
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
}