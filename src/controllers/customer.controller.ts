import {Controller, Body, Put, Get, Post, Delete, Param, NotFoundException} from "@nestjs/common";
import { CustomerDto } from "src/dto/customer.dto";
import { CustomerService } from "src/services/customer.service";

@Controller("customers")
export class CustomerController {
    constructor(
        private readonly customerService: CustomerService,
    ){}

    @Get()
    async findAll(): 
    Promise<{message: string, customers: CustomerDto[]}>{
        try {
            const customers = await this.customerService.findAll();
            return {
                message: "Successful",
                customers: customers
            }
        } catch (error) {
            throw new NotFoundException("Error");
        }
    };

    @Get(":id")
    async findOne(@Param("id") id: number):
     Promise<{message: string, customer: CustomerDto}> {
        try {
            const customer = await this.customerService.findOne(id);
            return {
                message: "Successful",
                customer: customer
            }
        } catch (error) {
            throw new NotFoundException("Error")
        }
    };

    @Post()
    async create(@Body() customerDto: CustomerDto):
     Promise<{message: string, customer: CustomerDto}>{
          try {
            const customer = await this.customerService
            .create(customerDto);
            return {
                message: " Successful",
                customer: customer
            }
          } catch (error) {
        
          }
    };

    @Put(":id")
    async update( @Body() customerDto: CustomerDto, @Param() id: number):
     Promise<{message: string, customer: CustomerDto}>{
        try {
            const updateCustomer = await this.customerService.update(customerDto, id);
            return {
                message: "Successful",
             customer: updateCustomer
            }
        } catch (error) {
           throw error; 
        }
     };

     @Delete(":id")
     async delete(@Param() id: number):
     Promise<{message: string, customer: CustomerDto}>{
        try {
           const deleteCustomer = await this.customerService.delete(id);
           return {
            message: "Successful",
            customer: deleteCustomer
           } 
        } catch (error) {
            throw error;
        }
     }
}