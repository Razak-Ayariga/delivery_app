import { RestaurantDto } from "src/dto/restaurant.dto";

export interface RestaurantInterface {
    findAll(): Promise<RestaurantDto[]>;
    findOne(id: number): Promise<RestaurantDto>;
    create(restaurantDto: RestaurantDto): Promise<RestaurantDto>;
    update(restaurantDto: RestaurantDto, id: number): Promise<RestaurantDto>;
    delete(id: number): Promise<RestaurantDto>;
}