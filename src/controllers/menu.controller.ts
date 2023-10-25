import {Controller, Body, Post, Put, Get, Delete, Param} from "@nestjs/common";
import {MenuDto} from "src/dto/menu.dto";
import {MenuService} from "src/services/menu.service";

@Controller("menu")
export class MenuController {
    constructor(
        private readonly menuService: MenuService
    ) {}

    @Get()
    async findAll():
    Promise<{message: string, menu: MenuDto[]}> {
        try {
            const menus = await this.menuService.findAll();
            return {
                message: "Successful",
                menu: menus
            }
        } catch (error) {
           throw error; 
        }
    };

    @Get(":id")
    async findOne(@Param() id: number):
    Promise<{message: string, menu: MenuDto}>{
        try {
            const menu = await this.menuService.findOne(id);
            return {
                message: "Successful",
                menu: menu
            }
        } catch (error) {
            throw error;
        }
    };

    @Post()
    async create(@Body() menuDto: MenuDto):
    Promise<{message: string, menu: MenuDto}>{
        try {
            const createMenu = await this.menuService.create(menuDto);
            return {
                message: "Successful",
                menu: createMenu
            }
        } catch (error) {
          throw error;  
        }
    };

    @Put(":id")
    async update(@Body() menuDto: MenuDto, @Param() id: number):
    Promise<{message: string, menu: MenuDto}>{
        try {
            const updateMenu = await this.menuService.update(id, menuDto);
            return {
                message: "Successful",
                menu: updateMenu
            }
        } catch (error) {
            throw error;
        }
    };

    @Delete(":id")
    async delete(@Param() id: number):
    Promise<{message: string, menu: MenuDto}>{
        try {
            const deleteMenu = await this.menuService.delete(id);
            return {
             message: "Successful",
             menu: deleteMenu
            }
        } catch (error) {
           throw error;
        }
    };
    
}