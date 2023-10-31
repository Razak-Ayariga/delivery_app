import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Order } from "src/entities/order.entity";
import { OrderDto } from "src/dto/order.dto";
import { OrderInterface } from "src/interfaces/order.interface";
import { OrderedMenuService } from "./orderedMenu.service";
import { OrderedMenuDto } from "src/dto/orderedMenu.dto";

@Injectable()
export class OrderService implements OrderInterface{
    constructor(
        @InjectRepository(Order) private orderRepository: Repository<Order>,
        private readonly orderedMenuService: OrderedMenuService
    ){}

    //Helper method to generate the next order_code
    async generateNextOrderCode(): Promise<string> {
        try {
          const latestOrder = await this.orderRepository
            .createQueryBuilder('order')
            .orderBy('order.created_at', 'DESC')
            .getOne();
      
          if (latestOrder) {
            const latestOrderCode = latestOrder.order_code;
           const nextOrderCode = parseInt(latestOrderCode, 10) + 1;
           return nextOrderCode.toString().padStart(8, "0")
          }else{
            return "00000001";
          }
      
        } catch (error) {
          throw error;
        }
      }
      
     
      

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
           const order = new OrderDto();
           order.restaurant_id = orderDto.restaurant_id;
           order.customer_id = orderDto.customer_id;
           order.delivery_point = orderDto.delivery_point;
           order.status = orderDto.status;
           order.total_amount = orderDto.total_amount;
           order.order_code = await this.generateNextOrderCode();
           const newOrder: any = await this.orderRepository.create(order);
            const createOrder: any = await this.orderRepository.save(newOrder);

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

            let updatedOrderedMenu: OrderedMenuDto[] = orderDto.ordered_menus;
            if(updatedOrderedMenu){
                updatedOrderedMenu = await this.orderedMenuService.updateOrderedMenu(
                   updatedOrderedMenu, id 
                );
            }
            const newOrder = this.orderRepository.merge(existingOrder, orderDto)
            const updatedOrder: any = await this.orderRepository.save(newOrder);
            updatedOrder.ordered_menus = updatedOrderedMenu;
            return updatedOrder;
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
            const deletedOrder:any = await this.orderRepository.remove(order)
            return deletedOrder;
        } catch (error) {
            throw error;
        }
    };

}