import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Order } from "src/entities/order.entity";
import { OrderDto } from "src/dto/order.dto";
import { OrderInterface } from "src/interfaces/order.interface";
import { OrderedMenuService } from "./orderedMenu.service";

@Injectable()
export class OrderService implements OrderInterface{
    constructor(
        @InjectRepository(Order) private orderRepository: Repository<Order>,
        private readonly orderedMenuService: OrderedMenuService
    ){}

    async findAll(): Promise<OrderDto[]> {
        try {
            const orders: any = await this.orderRepository.find();
            if(!orders){
                throw new NotFoundException("No orders found!");
            }
            for(const order of orders){
                order.ordered_menus = await this.orderedMenuService.findOrderedMenu(order.id);
            }
            return orders;
        } catch (error) {
            throw error;
        }
    };

    async findOne(id: number): Promise<OrderDto> {
       try {
          const order: any = await this.orderRepository.findOne({where: {id}});
          if(!order){
            throw new NotFoundException("Order not found!");
          }
          order.ordered_menus = await this.orderedMenuService.findOrderedMenu(order.id)
          return order;
       } catch (error) {
         throw error;
       } 
    };

    async create(orderDto: OrderDto): Promise<OrderDto> {
       try {
           const order: any = this.orderRepository.create(orderDto);
            const createOrder = await this.orderRepository.save(order);

           let orderedMenu = [];
           if(orderDto.ordered_menus){
            orderedMenu = await this.orderedMenuService.createMenuItems(
                orderDto.ordered_menus, createOrder.id
            )
        }
        createOrder.ordered_menus = orderedMenu;

           return createOrder;
       } catch (error) {
          throw error;
       } 
    };

    async update(orderDto: OrderDto, id: number): Promise<OrderDto> {
        try {
            const existingOrder: any = await this.orderRepository.findOne({where: {id}});
            if(!existingOrder){
                throw new NotFoundException("Order not found!");
            }
            const updateOrder = this.orderRepository.merge(existingOrder, orderDto)
            const updatedOrder = await this.orderRepository.save(updateOrder)
            return updateOrder[0];
        } catch (error) {
            throw error;
        }
    };

    async delete(id: number): Promise<OrderDto> {
        try {
            const order: any = await this.orderRepository.findOne({where:{id}});
            if(!order){
              throw new NotFoundException("Order not found!");
            }
            const deletedOrder = await this.orderRepository.remove(order)
            return;
        } catch (error) {
            throw error;
        }
    };

}