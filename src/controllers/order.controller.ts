import {Controller, Body, Post, Put, Get, Delete, Param} from "@nestjs/common";
import { OrderDto } from "src/dto/order.dto";
import { OrderService } from "src/services/order.service";

@Controller("order")
export class OrderController {
    constructor(
        private readonly orderService: OrderService
    ){}

    @Get()
    async findAll():
    Promise<{message: string, orders: OrderDto[]}>{
        try {
            const orders = await this.orderService.findAll();
            return {
                message: "Successful",
                orders: orders
            }
        } catch (error) {
           throw error; 
        }
    };

    @Get(":id")
    async findOne(@Param() id: number):
    Promise<{message: string, order: OrderDto}>{
        try {
           const order = await this.orderService.findOne(id);
           return {
            message: "Successful",
            order: order
           } 
        } catch (error) {
          throw error;
        }
    };

    @Post()
    async create(@Body() orderDto: OrderDto):
    Promise<{message: string, order: OrderDto}>{
        try {
            const createOrder = await this.orderService.create(orderDto);
            return {
                message: "Successful",
                order: createOrder
            }
        } catch (error) {
            throw error;
        }
    };

    @Put(":id")
    async update(@Body() orderDto: OrderDto, @Param() id: number):
    Promise<{message: string, order: OrderDto}>{
        try {
            const updateOrder = await this.orderService.update(orderDto, id);
            return {
                message: "Successful",
                order: updateOrder
            }
        } catch (error) {
           throw error; 
        }
    };

    @Delete(":id")
    async delete(@Param() id: number):
    Promise<{message: string, order: OrderDto}>{
        try {
            const deleteOrder = await this.orderService.delete(id);
            return {
                message: "Successful",
                order: deleteOrder
            }
        } catch (error) {
            throw error;
        }
    }
}