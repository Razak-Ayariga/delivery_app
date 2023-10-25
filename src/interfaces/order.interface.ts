import { OrderDto } from "src/dto/order.dto";

export interface OrderInterface {
    findAll(): Promise<OrderDto[]>;
    findOne(id: number): Promise<OrderDto>;
    create(orderDto: OrderDto): Promise<OrderDto>;
    update(orderDto: OrderDto, id: number): Promise<OrderDto>;
    delete(id: number): Promise<OrderDto>;
}