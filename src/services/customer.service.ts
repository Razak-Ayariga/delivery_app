import { Injectable, ConflictException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CustomerInterface } from "src/interfaces/customer.interface";
import { Customer } from "src/entities/customer.entity";
import { CustomerDto } from "src/dto/customer.dto";
import {hash} from "bcryptjs";

@Injectable()
export class CustomerService implements CustomerInterface {
    constructor(
        @InjectRepository(Customer) private customerRepository: Repository<Customer>,
    ){}
    
    async findAll(): Promise<CustomerDto[]> {
        try {
            const customers: any = await this.customerRepository.find()
                return customers;
        } catch (error) {
            throw error;
        }
        
    };

    async findOne(id: number): Promise<CustomerDto> {
        try {
            const customer: any = await this.customerRepository.findOne({where:{id}})
            return customer;
        } catch (error) {
            throw error;
        }
    };

    async create(customerDto: CustomerDto): Promise<CustomerDto> {
        try {
            const existingCustomer: any = await this.customerRepository.findOne({where: {email:customerDto.email }});
            if(existingCustomer){
                throw new ConflictException(" User already exists");
            }
            if(customerDto.password){
                const hashPassword = await hash(customerDto.password, 10);
                customerDto.password = hashPassword;
            }
            const customer: any = this.customerRepository.create(customerDto);
            await this.customerRepository.save(customer);
            return customer;
        } catch (error) {
            throw error;
        }
    };

    async update(customerDto: CustomerDto, id: number): Promise<CustomerDto> {
        try {
            const customer: any = await this.customerRepository.findOne({where: {id}});
            if(!customer){
              throw new NotFoundException(" User not found!");
            }
            const updateCustomer = this.customerRepository.merge(customer, customerDto);
            const updatedCustomer = await this.customerRepository.save(updateCustomer);
            return updatedCustomer;

        } catch (error) {
            throw error;
        } 
    };

    async delete(id: number): Promise<CustomerDto> {
        try {
            const customer: any = await this.customerRepository.findOne({where: {id}});
            if(!customer){
                throw new NotFoundException("User not found!");
            }
            const deleteCustomer: any = await this.customerRepository.remove(customer);
            return deleteCustomer;
        } catch (error) {
           throw error; 
        }
    };

    async findByEmail(email: string): Promise<CustomerDto>{
        return this.customerRepository.findOne({where:{email}});
    }

}

