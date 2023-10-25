import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConnection } from './database/dbConfig';
import { entities } from './database/entities';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRoot(dbConnection),
    TypeOrmModule.forFeature(entities)
  ],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
