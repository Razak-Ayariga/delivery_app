import { CustomerDto } from "src/dto/customer.dto";

export interface CustomerInterface {
    findAll(): Promise<CustomerDto[]>;
    findOne(id: number): Promise<CustomerDto>;
    create(customerDto: CustomerDto): Promise<CustomerDto>;
    update(customerDto: CustomerDto, id: number): Promise<CustomerDto>;
    delete(id: number): Promise<CustomerDto>;
}