import { Injectable, UnauthorizedException} from "@nestjs/common";
import { compare } from "bcryptjs";
import { JwtService } from "@nestjs/jwt";
import { ConfigModule } from "@nestjs/config";
import { LoginDto } from "src/dto/auth.dto";
import { RestaurantService } from "./restaurant.service";

ConfigModule.forRoot();
@Injectable()
export class RestaurantAuthService {
    constructor(
       private readonly restaurantService: RestaurantService,
        private readonly jwtService: JwtService
    ){}

    async login(loginDto: LoginDto): Promise<any>{
        try {
            const restaurant = await this.restaurantService.findByEmail(loginDto.email);
            if(!restaurant){
                throw new UnauthorizedException("Invalid credentials");
            }
            const passwordMatch = await compare(loginDto.password, restaurant.password);
            if(!passwordMatch){
                throw new UnauthorizedException("Invalid credentials");
            }

            const payload = {
                id: restaurant.id,
                email: restaurant.email,
                full_name: restaurant.full_name
            }

            const token = await this.jwtService
            .signAsync(payload, {secret: process.env.JWT_CONSTANT});

           const restaurantData = {
            full_name: restaurant.full_name,
            email: restaurant.email,
            phone_number: restaurant.phone_number,
            address: restaurant.address,
            gps: restaurant.gps,
           }

           return {
            message: "Login successful",
            token: token,
            data: restaurantData
           }
        } catch (error) {
            throw error;
        }
    }
}

