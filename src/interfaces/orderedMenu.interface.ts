import { OrderedMenuDto } from "src/dto/orderedMenu.dto";

export interface OrderedMenuInterface {
    findAll(): Promise<OrderedMenuDto[]>;
    findOne(id: number): Promise<OrderedMenuDto>;
    create(orderedMenuDto: OrderedMenuDto): Promise<OrderedMenuDto>;
    update(orderedMenuDto: OrderedMenuDto, id: number): Promise<OrderedMenuDto>;
    delete(id: number): Promise<OrderedMenuDto>;
}