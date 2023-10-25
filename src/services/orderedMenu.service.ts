import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderedMenu } from 'src/entities/orderedMenu.entity';
import { OrderedMenuDto } from 'src/dto/orderedMenu.dto';
import { OrderedMenuInterface } from 'src/interfaces/orderedMenu.interface';

@Injectable()
export class OrderedMenuService implements OrderedMenuInterface {
  constructor(
    @InjectRepository(OrderedMenu)
    private orderedMenuRepository: Repository<OrderedMenu>,
  ) {}

  async findAll(): Promise<OrderedMenuDto[]> {
    try {
      const orderedMenus: any = await this.orderedMenuRepository.find();
      if (!orderedMenus) {
        throw new NotFoundException('Records not found');
      }
      return orderedMenus;
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number): Promise<OrderedMenuDto> {
    try {
      const orderedMenu: any = await this.findOne(id);
      if (!orderedMenu) {
        throw new NotFoundException('Record Not found');
      }
      return orderedMenu;
    } catch (error) {
      throw error;
    }
  }

  async create(orderedMenuDto: OrderedMenuDto): Promise<OrderedMenuDto> {
    try {
      const newOrderedMenu = this.orderedMenuRepository.create(orderedMenuDto);
      await this.orderedMenuRepository.save(newOrderedMenu);
      return newOrderedMenu;
    } catch (error) {
      throw error;
    }
  }

  async update(
    orderedMenuDto: OrderedMenuDto,
    id: number,
  ): Promise<OrderedMenuDto> {
    try {
      const existingOrderedMenu: any = await this.findOne(id);
      if (!existingOrderedMenu) {
        throw new NotFoundException('No record found!');
      }
      const updateOrderedMenu = this.orderedMenuRepository.merge(
        existingOrderedMenu,
        orderedMenuDto,
      );
      const updatedOrderedMenu =
        await this.orderedMenuRepository.save(updateOrderedMenu);
      return updatedOrderedMenu;
    } catch (error) {
        throw error;
    }
  };

  async delete(id: number): Promise<OrderedMenuDto> {
    try {
        const existingOrderedMenu: any = await this.findOne(id);
      if (!existingOrderedMenu) {
        throw new NotFoundException('No record found!');
      }
      const deletedResults = 
      await this.orderedMenuRepository.remove(existingOrderedMenu);
      return deletedResults[0];
    } catch (error) {
        throw error;
    }
      
  };

  //create multiple ordered menu items
  async createMenuItems(orderedMenu: OrderedMenuDto[], orderId: number): 
  Promise<OrderedMenuDto[]> {
       const orderedMenuArray = Array.isArray(orderedMenu)
       ? orderedMenu: [orderedMenu];
       const createOrderedMenus: OrderedMenuDto[]=[];
       for(const orderedMenu of orderedMenuArray){
        orderedMenu.order_id = orderId;
        const createdOrderMenu = await this.create(orderedMenu);
        createOrderedMenus.push(createdOrderMenu);
       }
       return createOrderedMenus;
  }
}
