import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConnection } from './database/dbConfig';
import { entities } from './database/entities';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { RestaurantController } from './controllers/restaurant.controller';
import { MenuController } from './controllers/menu.controller';
import { CustomerController } from './controllers/customer.controller';
import { OrderController } from './controllers/order.controller';
import { RestaurantService } from './services/restaurant.service';
import { OrderService } from './services/order.service';
import { MenuService } from './services/menu.service';
import { CustomerService } from './services/customer.service';
import { OrderedMenuService } from './services/orderedMenu.service';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRoot(dbConnection),
    TypeOrmModule.forFeature(entities)
  ],
  controllers:[
    RestaurantController,
    CustomerController,
    MenuController,
    OrderController
  ],
  providers:[
    RestaurantService,
    CustomerService,
    MenuService,
    OrderService,
    OrderedMenuService
  ]
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
