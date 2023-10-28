import { Module } from '@nestjs/common';
import {JwtModule} from "@nestjs/jwt";
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
import { CustomerAuthController } from './controllers/customer.auth.controller';
import { CustomerAuthService } from './services/customer.auth.service';
import { RestaurantAuthController } from './controllers/restaurant.auth.controller';
import { RestaurantAuthService } from './services/restaurant.auth.service';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    JwtModule.register({secret: process.env.JWT_CONSTANT}),
    TypeOrmModule.forRoot(dbConnection),
    TypeOrmModule.forFeature(entities)
  ],
  controllers:[
    RestaurantController,
    CustomerController,
    MenuController,
    OrderController,
    CustomerAuthController,
    RestaurantAuthController
  ],
  providers:[
    RestaurantService,
    CustomerService,
    MenuService,
    OrderService,
    OrderedMenuService,
    CustomerAuthService,
    RestaurantAuthService
  ]
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
