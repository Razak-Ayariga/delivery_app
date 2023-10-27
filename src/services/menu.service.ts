import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Menu } from "src/entities/menu.entity";
import { MenuDto } from "src/dto/menu.dto";
import { MenuInterface } from "src/interfaces/menu.interface";

@Injectable()
export class MenuService implements MenuInterface {
    constructor(
        @InjectRepository(Menu) private MenuRepository: Repository<MenuDto>,
    ){}

    async findAll(): Promise<MenuDto[]> {
        try {
            const menus: any = await this.MenuRepository.find();
            if(!menus){
                throw new NotFoundException("No menu available!");
            }
            return menus;
        } catch (error) {
            throw error;
        }
    };

    async findOne(id: number): Promise<MenuDto> {
        try {
            const menu: any = await this.MenuRepository.findOne({where: {id}});
            if(!menu){
                throw new NotFoundException("Menu not found!");
            }

            return menu;
        } catch (error) {
           throw error; 
        }
    };

    async create(menuDto: MenuDto): Promise<MenuDto> {
       try {
        const menu: any = await this.MenuRepository.create(menuDto);
        await this.MenuRepository.save(menu);
        return menu;
       } catch (error) {
        throw error;
       } 
    };

    async update(id: number, menuDto: MenuDto): Promise<MenuDto> {
        try {
            const existingMenu: any =  await this.MenuRepository.findOne({where: {id}});
            if(!existingMenu){
                throw new NotFoundException("Menu not found!");
            }
            const updateMenu = this.MenuRepository.merge(existingMenu, menuDto);
            const updatedMenu = await this.MenuRepository.save(updateMenu);
            return updatedMenu;
        } catch (error) {
            throw error;
        }
    };

    async delete(id: number): Promise<MenuDto> {
        try {
            const existingMenu: any = await this.MenuRepository.findOne({where:{id}});
            if(!existingMenu){
                throw new NotFoundException("Menu not found!");
            }
            const deleteMenu = await this.MenuRepository.remove(existingMenu);
            return deleteMenu[0];
        } catch (error) {
            
        }
    };

    //find menu by restaurant_id
    async findAllMenu(restaurant_id: number): Promise<MenuDto[]>{
        try {
            const restaurantMenu = await this.MenuRepository.find({where:{restaurant_id}});
            return restaurantMenu;
        } catch (error) {
            throw error;
        }
    }
}