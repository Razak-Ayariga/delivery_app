import { Injectable, NotFoundException, ConflictException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Restaurant } from "src/entities/restaurant.entity";
import { RestaurantDto } from "src/dto/restaurant.dto";
import { RestaurantInterface } from "src/interfaces/restaurant.interface";

@Injectable()
export class RestaurantService implements RestaurantInterface {
    constructor(
        @InjectRepository(Restaurant) private restaurantRepository: Repository<RestaurantDto>,
    ) {}

    async findAll(): Promise<RestaurantDto[]> {
        try {
            const restaurants: any = await this.restaurantRepository.find();
            if(!restaurants){
                throw new NotFoundException("no restaurant found!");
            }
            return restaurants;
        } catch (error) {
            throw error;
        }
    };

    async findOne(id: number): Promise<RestaurantDto> {
       try {
        const restaurant: any = await this.restaurantRepository.findOne({where: {id}});
        if(!restaurant){
            throw new NotFoundException;
        }
        return restaurant;
       } catch (error) {
        throw error;
       } 
    };

    async create(restaurantDto: RestaurantDto): Promise<RestaurantDto> {
        try {
            const existingRestaurant: any = await this.restaurantRepository.findOne({where:{email:restaurantDto.email}});
            if(existingRestaurant){
            throw new ConflictException("Restaurant already exist!");
            }
             const restaurant: any = this.restaurantRepository.create(restaurantDto);
             await this.restaurantRepository.save(restaurant);
             return restaurant;
        } catch (error) {
            throw error;
        }
    };

    async update(restaurantDto: RestaurantDto, id: number): Promise<RestaurantDto> {
        try {
            const existingRestaurant: any = await this.restaurantRepository.findOne({where: {id}});
            if(!existingRestaurant){
                throw new NotFoundException("Restaurant not found!");
            }
            const updateRestaurant = this.restaurantRepository.merge(existingRestaurant, restaurantDto);
            const updatedInfo = await this.restaurantRepository.save(updateRestaurant);
            return updatedInfo;
        } catch (error) {
            throw error;
        }
    };

    async delete(id: number): Promise<RestaurantDto> {
        try {
            const restaurant = await this.restaurantRepository.findOne({where:{id}});
            if(!restaurant){
                throw new NotFoundException("Restaurant not found!");
            }
            const deleteRestaurant = await this.restaurantRepository.remove(restaurant);
            return deleteRestaurant;
        } catch (error) {
            throw error;
        }
    }
}