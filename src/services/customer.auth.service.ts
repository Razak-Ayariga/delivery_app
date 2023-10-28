import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import {compare} from "bcryptjs";
import { ConfigModule } from "@nestjs/config";
import { LoginDto } from "src/dto/auth.dto";
import { CustomerService } from "./customer.service";

ConfigModule.forRoot();
@Injectable()
export class CustomerAuthService {
    constructor(
         private readonly customerService: CustomerService,
         private readonly jwtService: JwtService
    ){}

    async login(loginDto: LoginDto): Promise<any> {
        try {
        const customer = await this.customerService.findByEmail(loginDto.email);
        if(!customer){
           throw new UnauthorizedException("Invalid Credentials");
        }
        const passwordMatch = await compare(loginDto.password, customer.password );
        if(!passwordMatch){
            throw new UnauthorizedException("Invalid credentials");
        }

        const payload = {
            id: customer.id,
            full_name: customer.full_name,
            email: customer.email,
            gender: customer.gender,
            phone_number: customer.phone_number
        };

        const token = await this.jwtService
        .signAsync(payload, {secret: process.env.JWT_CONSTANT});

        const customerData = {
            full_name: customer.full_name,
            gender: customer.gender,
            email: customer.email,
            phone_number: customer.phone_number 
        }

        return {
            message: "Login successful",
            token: token,
            data: customerData
        }
        } catch (error) {
          throw error;  
        }
    }
}