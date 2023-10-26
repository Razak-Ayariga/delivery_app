import {Controller, Body, Post, Put, Get, Delete, Param} from "@nestjs/common";
import { RestaurantDto } from "src/dto/restaurant.dto";
import { RestaurantService } from "src/services/restaurant.service";

@Controller("restaurant")
export class RestaurantController {
    constructor(
        private readonly restaurantService: RestaurantService,
    ){}

    @Get()
    async findAll():
     Promise<{message: string, restaurants: RestaurantDto[]}> {
     try {
        const restaurants = await this.restaurantService.findAll();
        return {
            message: "Successful",
            restaurants: restaurants
        }
     } catch (error) {
        throw error;
     }
    };
    
    @Get(":id")
    async findOne(@Param("id") id: number):
    Promise<{message: string, restaurant: RestaurantDto}> {
        try {
            const restaurant = await this.restaurantService.findOne(id);
            return {
                message: " Successful",
                restaurant: restaurant
            }

        } catch (error) {
           throw error; 
        }
    };

    @Post()
    async create(@Body() restaurantDto: RestaurantDto):
    Promise<{message: string, restaurant: RestaurantDto}>{
        try {
            const newRestaurant = await this.restaurantService.create(restaurantDto);
            return {
                message: "Successful",
                restaurant: newRestaurant
            }
        } catch (error) {
            throw error;
        }
    };

    @Put(":id")
    async update(@Body() restaurantDto: RestaurantDto, @Param() id: number): 
    Promise<{message: string, restaurant: RestaurantDto}>{
        try {
           const updateRestaurant = await this.restaurantService.update(restaurantDto, id);
           return {
            message: " successful",
            restaurant: updateRestaurant
           }
        } catch (error) {
            
        }
    }

    @Delete(":id")
    async delete(id: number):
    Promise<{message: string}> {
        try {
           const deletedResults = await this.restaurantService.delete(id);
           return {
            message: "Successful",

           } 
        } catch (error) {
          throw error;
        }
    }
}