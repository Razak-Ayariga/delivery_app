import { MenuDto } from "src/dto/menu.dto";

export interface MenuInterface {
    findAll(): Promise<MenuDto[]>;
    findOne(id: number): Promise<MenuDto>;
    create(menuDto: MenuDto): Promise<MenuDto>;
    update(id: number, menuDto: MenuDto): Promise<MenuDto>;
    delete(id: number): Promise<MenuDto>;
}