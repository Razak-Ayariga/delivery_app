import { Controller, Body, Post } from "@nestjs/common";
import { LoginDto } from "src/dto/auth.dto";
import { CustomerAuthService } from "src/services/customer.auth.service";

@Controller("customer")
export class CustomerAuthController {
    constructor(
        private readonly customerAuthService: CustomerAuthService
    ){}
    
    @Post("login")
    async login(@Body() loginDto: LoginDto) {
        return this.customerAuthService.login(loginDto);
    }
}