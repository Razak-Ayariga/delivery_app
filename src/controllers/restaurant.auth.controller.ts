import { Controller, Body, Post } from "@nestjs/common";
import { LoginDto } from "src/dto/auth.dto";
import { RestaurantAuthService } from "src/services/restaurant.auth.service";

@Controller("restaurant")
export class RestaurantAuthController {
    constructor(
        private readonly restaurantAuthService: RestaurantAuthService
    ){}

    @Post("login")
    async login(@Body() loginDto: LoginDto){
        return this.restaurantAuthService.login(loginDto);
    }
}